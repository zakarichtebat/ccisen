import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTypeDocumentDto } from './dto/create-type-document.dto';
import { CreateDemandeDocumentDto } from './dto/create-demande-document.dto';
import { UpdateDemandeDocumentDto } from './dto/update-demande-document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  // ===== TYPES DE DOCUMENTS =====

  async createTypeDocument(data: CreateTypeDocumentDto) {
    return this.prisma.typeDocument.create({
      data: {
        nom: data.nom,
        description: data.description,
        documentsRequis: data.documentsRequis,
        delaiTraitement: data.delaiTraitement,
        prix: data.prix,
        actif: data.actif ?? true,
        template: data.template
      }
    });
  }

  async findAllTypesDocuments() {
    return this.prisma.typeDocument.findMany({
      where: { actif: true },
      orderBy: { nom: 'asc' }
    });
  }

  async findTypeDocumentById(id: number) {
    const typeDocument = await this.prisma.typeDocument.findUnique({
      where: { id }
    });

    if (!typeDocument) {
      throw new NotFoundException(`Type de document avec l'ID ${id} non trouvé`);
    }

    return typeDocument;
  }

  async updateTypeDocument(id: number, data: Partial<CreateTypeDocumentDto>) {
    await this.findTypeDocumentById(id);

    return this.prisma.typeDocument.update({
      where: { id },
      data
    });
  }

  async deleteTypeDocument(id: number) {
    await this.findTypeDocumentById(id);

    return this.prisma.typeDocument.update({
      where: { id },
      data: { actif: false }
    });
  }

  // ===== DEMANDES DE DOCUMENTS =====

  async createDemandeDocument(data: CreateDemandeDocumentDto) {
    // Vérifier que le type de document existe
    await this.findTypeDocumentById(data.typeDocumentId);

    // Utiliser un userId par défaut pour les tests
    const userId = 1;

    const demande = await this.prisma.demandeDocument.create({
      data: {
        userId,
        typeDocumentId: data.typeDocumentId,
        nomDemandeur: data.nomDemandeur,
        prenomDemandeur: data.prenomDemandeur,
        emailDemandeur: data.emailDemandeur,
        numRegistreCommerce: data.numRegistreCommerce,
        registreCommercePdf: data.registreCommercePdf,
        photoIdentite: data.photoIdentite,
        autresDocuments: data.autresDocuments,
        commentairesClient: data.commentairesClient
      },
      include: {
        typeDocument: true,
        user: {
          select: { id: true, nom: true, prenom: true, email: true }
        }
      }
    });

    // Créer l'historique initial
    await this.prisma.historiqueStatut.create({
      data: {
        demandeDocumentId: demande.id,
        ancienStatut: null,
        nouveauStatut: 'en_attente',
        motif: 'Demande initiale créée'
      }
    });

    // Créer notification pour le client
    await this.prisma.notificationDocument.create({
      data: {
        demandeDocumentId: demande.id,
        userId: userId,
        titre: 'Demande reçue',
        message: `Votre demande de ${demande.typeDocument.nom} a été reçue et est en cours de traitement.`,
        type: 'info'
      }
    });

    return demande;
  }

  async findAllDemandesDocuments(role?: string) {
    return this.prisma.demandeDocument.findMany({
      include: {
        typeDocument: {
          select: { nom: true, prix: true, delaiTraitement: true }
        },
        user: {
          select: { id: true, nom: true, prenom: true, email: true }
        },
        documentsGeneres: true,
        _count: {
          select: {
            historiqueStatuts: true,
            notifications: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findDemandesDocumentsByUser(userId: number) {
    return this.prisma.demandeDocument.findMany({
      where: { userId },
      include: {
        typeDocument: {
          select: { nom: true, prix: true, delaiTraitement: true }
        },
        documentsGeneres: true,
        historiqueStatuts: {
          orderBy: { dateChangement: 'desc' },
          take: 1
        },
        notifications: {
          where: { lu: false }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findDemandeDocumentById(id: number) {
    const demande = await this.prisma.demandeDocument.findUnique({
      where: { id },
      include: {
        typeDocument: true,
        user: {
          select: { id: true, nom: true, prenom: true, email: true }
        },
        documentsGeneres: true,
        historiqueStatuts: {
          include: {
            admin: {
              select: { nom: true, prenom: true }
            }
          },
          orderBy: { dateChangement: 'desc' }
        },
        notifications: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!demande) {
      throw new NotFoundException(`Demande de document avec l'ID ${id} non trouvée`);
    }

    return demande;
  }

  async updateDemandeDocument(id: number, data: UpdateDemandeDocumentDto) {
    const demande = await this.findDemandeDocumentById(id);
    const ancienStatut = demande.statut;
    const adminId = 1; // Valeur par défaut

    const demandeUpdated = await this.prisma.demandeDocument.update({
      where: { id },
      data: {
        ...data,
        adminTraitantId: adminId,
        dateTraitement: new Date()
      },
      include: {
        typeDocument: true,
        user: {
          select: { id: true, nom: true, prenom: true, email: true }
        }
      }
    });

    // Créer l'historique si le statut a changé
    if (data.statut && data.statut !== ancienStatut) {
      await this.prisma.historiqueStatut.create({
        data: {
          demandeDocumentId: id,
          ancienStatut,
          nouveauStatut: data.statut,
          adminId,
          motif: data.motifRejet || `Statut changé vers ${data.statut}`
        }
      });

      // Créer notification pour le client
      const messages = {
        'en_cours': 'Votre demande est maintenant en cours de traitement.',
        'accepte': 'Votre demande a été acceptée. Le document sera bientôt généré.',
        'rejete': `Votre demande a été rejetée. ${data.motifRejet || 'Veuillez contacter l\'administration.'}`,
        'termine': 'Votre document est prêt et peut être téléchargé.'
      };

      if (messages[data.statut]) {
        await this.prisma.notificationDocument.create({
          data: {
            demandeDocumentId: id,
            userId: demande.userId,
            titre: `Mise à jour de votre demande`,
            message: messages[data.statut],
            type: data.statut === 'rejete' ? 'error' : 'info'
          }
        });
      }
    }

    return demandeUpdated;
  }

  // ===== DOCUMENTS GÉNÉRÉS =====

  async generateDocument(demandeId: number) {
    const demande = await this.findDemandeDocumentById(demandeId);
    const adminId = 1; // Valeur par défaut

    if (demande.statut !== 'accepte') {
      throw new BadRequestException('La demande doit être acceptée avant de générer le document');
    }

    // Récupérer le type de document séparément pour avoir accès au nom
    const typeDocument = await this.findTypeDocumentById(demande.typeDocumentId);
    
    const numeroDocument = `CCISN-${typeDocument.nom.substring(0, 2).toUpperCase()}-${Date.now()}`;
    const nomFichier = `${typeDocument.nom.toLowerCase().replace(/\s+/g, '-')}-${numeroDocument}.pdf`;

    const documentGenere = await this.prisma.documentGenere.create({
      data: {
        demandeDocumentId: demandeId,
        typeDocumentId: demande.typeDocumentId,
        userId: demande.userId,
        numeroDocument,
        nomFichier,
        cheminFichier: `/documents/generated/${nomFichier}`,
        tailleFichier: 0, // À remplir après génération du PDF
        statut: 'genere',
        hashDocument: `sha256:${Math.random().toString(36)}`,
        qrCode: `QR-${numeroDocument}`
      }
    });

    // Mettre à jour le statut de la demande
    await this.updateDemandeDocument(demandeId, { statut: 'termine' });

    return documentGenere;
  }

  async findDocumentsGeneresByUser(userId: number = 1) {
    return this.prisma.documentGenere.findMany({
      where: { userId },
      include: {
        typeDocument: {
          select: { nom: true }
        },
        demandeDocument: {
          select: { nomDemandeur: true, prenomDemandeur: true }
        }
      },
      orderBy: { dateGeneration: 'desc' }
    });
  }

  async downloadDocument(id: number, userId: number = 1) {
    const document = await this.prisma.documentGenere.findUnique({
      where: { id },
      include: {
        demandeDocument: true
      }
    });

    if (!document) {
      throw new NotFoundException('Document non trouvé');
    }

    if (document.userId !== userId) {
      throw new BadRequestException('Vous n\'avez pas accès à ce document');
    }

    // Mettre à jour les statistiques de téléchargement
    await this.prisma.documentGenere.update({
      where: { id },
      data: {
        dateTelecharge: new Date(),
        nbTelecharge: { increment: 1 },
        statut: 'telecharge'
      }
    });

    return document;
  }

  // ===== NOTIFICATIONS =====

  async findNotificationsByUser(userId: number = 1) {
    return this.prisma.notificationDocument.findMany({
      where: { userId },
      include: {
        demandeDocument: {
          include: {
            typeDocument: {
              select: { nom: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async markNotificationAsRead(id: number, userId: number = 1) {
    const notification = await this.prisma.notificationDocument.findUnique({
      where: { id }
    });

    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }

    if (notification.userId !== userId) {
      throw new BadRequestException('Vous n\'avez pas accès à cette notification');
    }

    return this.prisma.notificationDocument.update({
      where: { id },
      data: {
        lu: true,
        dateLecture: new Date()
      }
    });
  }

  // ===== STATISTIQUES =====

  async getStatistiques() {
    const [
      totalDemandes,
      demandesEnAttente,
      demandesAcceptees,
      demandesRejetees,
      documentsGeneres,
      typesDocuments
    ] = await Promise.all([
      this.prisma.demandeDocument.count(),
      this.prisma.demandeDocument.count({ where: { statut: 'en_attente' } }),
      this.prisma.demandeDocument.count({ where: { statut: 'accepte' } }),
      this.prisma.demandeDocument.count({ where: { statut: 'rejete' } }),
      this.prisma.documentGenere.count(),
      this.prisma.typeDocument.count({ where: { actif: true } })
    ]);

    return {
      totalDemandes,
      demandesEnAttente,
      demandesAcceptees,
      demandesRejetees,
      documentsGeneres,
      typesDocuments
    };
  }
} 