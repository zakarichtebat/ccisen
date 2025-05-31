import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { CreateTypeDocumentDto } from './dto/create-type-document.dto';
import { CreateDemandeDocumentDto } from './dto/create-demande-document.dto';
import { UpdateDemandeDocumentDto } from './dto/update-demande-document.dto';

@ApiTags('Documents CCISN')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // ===== TYPES DE DOCUMENTS =====

  @Get('types')
  @ApiOperation({
    summary: 'Obtenir tous les types de documents',
    description: 'Récupère la liste de tous les types de documents disponibles'
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des types de documents récupérée avec succès'
  })
  findAllTypesDocuments() {
    return this.documentService.findAllTypesDocuments();
  }

  @Get('types/:id')
  @ApiOperation({
    summary: 'Obtenir un type de document par ID'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID du type de document'
  })
  @ApiResponse({
    status: 200,
    description: 'Type de document trouvé'
  })
  @ApiResponse({
    status: 404,
    description: 'Type de document non trouvé'
  })
  findTypeDocumentById(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findTypeDocumentById(id);
  }

  @Post('types')
  @ApiOperation({
    summary: 'Créer un nouveau type de document (Admin uniquement)',
    description: 'Permet aux administrateurs de créer de nouveaux types de documents'
  })
  @ApiResponse({
    status: 201,
    description: 'Type de document créé avec succès'
  })
  createTypeDocument(@Body() createTypeDocumentDto: CreateTypeDocumentDto) {
    return this.documentService.createTypeDocument(createTypeDocumentDto);
  }

  @Patch('types/:id')
  @ApiOperation({
    summary: 'Mettre à jour un type de document (Admin uniquement)'
  })
  @ApiParam({
    name: 'id',
    type: 'number'
  })
  updateTypeDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypeDocumentDto: Partial<CreateTypeDocumentDto>
  ) {
    return this.documentService.updateTypeDocument(id, updateTypeDocumentDto);
  }

  @Delete('types/:id')
  @ApiOperation({
    summary: 'Supprimer un type de document (Admin uniquement)',
    description: 'Désactive le type de document (suppression logique)'
  })
  @ApiParam({
    name: 'id',
    type: 'number'
  })
  deleteTypeDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.deleteTypeDocument(id);
  }

  // ===== DEMANDES DE DOCUMENTS =====

  @Post('demandes')
  @ApiOperation({
    summary: 'Créer une nouvelle demande de document',
    description: 'Permet aux clients de faire une demande de document officiel'
  })
  @ApiResponse({
    status: 201,
    description: 'Demande créée avec succès'
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides'
  })
  createDemandeDocument(
    @Body() createDemandeDocumentDto: CreateDemandeDocumentDto
  ) {
    return this.documentService.createDemandeDocument(createDemandeDocumentDto);
  }

  @Get('demandes')
  @ApiOperation({
    summary: 'Obtenir les demandes de documents',
    description: 'Récupère les demandes selon le rôle : toutes pour admin, personnelles pour client'
  })
  @ApiQuery({
    name: 'role',
    required: false,
    description: 'Role de l\'utilisateur (admin ou client)'
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des demandes récupérée avec succès'
  })
  findDemandesDocuments(@Query('role') role?: string) {
    return this.documentService.findAllDemandesDocuments(role);
  }

  @Get('demandes/:id')
  @ApiOperation({
    summary: 'Obtenir une demande de document par ID'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID de la demande'
  })
  @ApiResponse({
    status: 200,
    description: 'Demande trouvée'
  })
  @ApiResponse({
    status: 404,
    description: 'Demande non trouvée'
  })
  findDemandeDocumentById(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findDemandeDocumentById(id);
  }

  @Patch('demandes/:id')
  @ApiOperation({
    summary: 'Mettre à jour une demande de document (Admin uniquement)',
    description: 'Permet aux administrateurs de changer le statut et ajouter des notes'
  })
  @ApiParam({
    name: 'id',
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'Demande mise à jour avec succès'
  })
  updateDemandeDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDemandeDocumentDto: UpdateDemandeDocumentDto
  ) {
    return this.documentService.updateDemandeDocument(id, updateDemandeDocumentDto);
  }

  // ===== GÉNÉRATION DE DOCUMENTS =====

  @Post('demandes/:id/generer')
  @ApiOperation({
    summary: 'Générer le document final (Admin uniquement)',
    description: 'Génère le document PDF final pour une demande acceptée'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID de la demande'
  })
  @ApiResponse({
    status: 201,
    description: 'Document généré avec succès'
  })
  @ApiResponse({
    status: 400,
    description: 'La demande doit être acceptée avant génération'
  })
  generateDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.generateDocument(id);
  }

  @Get('mes-documents')
  @ApiOperation({
    summary: 'Obtenir mes documents générés',
    description: 'Récupère tous les documents générés pour l\'utilisateur connecté'
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des documents générés'
  })
  findMyDocuments() {
    return this.documentService.findDocumentsGeneresByUser();
  }

  @Get('documents/:id/download')
  @ApiOperation({
    summary: 'Télécharger un document',
    description: 'Permet de télécharger un document généré'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID du document généré'
  })
  @ApiResponse({
    status: 200,
    description: 'Document téléchargé'
  })
  @ApiResponse({
    status: 403,
    description: 'Accès refusé'
  })
  downloadDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.downloadDocument(id);
  }

  // ===== NOTIFICATIONS =====

  @Get('notifications')
  @ApiOperation({
    summary: 'Obtenir mes notifications',
    description: 'Récupère toutes les notifications de l\'utilisateur'
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des notifications'
  })
  findMyNotifications() {
    return this.documentService.findNotificationsByUser();
  }

  @Patch('notifications/:id/read')
  @ApiOperation({
    summary: 'Marquer une notification comme lue'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID de la notification'
  })
  @ApiResponse({
    status: 200,
    description: 'Notification marquée comme lue'
  })
  markNotificationAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.markNotificationAsRead(id);
  }

  // ===== STATISTIQUES =====

  @Get('statistiques')
  @ApiOperation({
    summary: 'Obtenir les statistiques du système de documents',
    description: 'Récupère les statistiques globales du système de documents'
  })
  @ApiResponse({
    status: 200,
    description: 'Statistiques récupérées avec succès'
  })
  getStatistiques() {
    return this.documentService.getStatistiques();
  }
} 