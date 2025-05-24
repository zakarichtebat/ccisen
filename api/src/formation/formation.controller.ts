import { Controller, Get, Post, Body, Param, Delete, Patch, Req, HttpException, HttpStatus } from '@nestjs/common';
import { FormationService } from './formation.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('formations')
@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new formation (Admin only)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titre: { type: 'string', example: 'Formation Marketing Digital' },
        description: { type: 'string', example: 'Formation complète sur le marketing digital' },
        dateDebut: { type: 'string', format: 'date', example: '2025-06-01' },
        dateFin: { type: 'string', format: 'date', example: '2025-06-03' },
        heureDebut: { type: 'string', example: '09:00' },
        heureFin: { type: 'string', example: '17:00' },
        lieu: { type: 'string', example: 'Centre de formation CCISN' },
        maxParticipants: { type: 'number', example: 20 },
        prix: { type: 'number', example: 500 }
      },
      required: ['titre', 'description', 'dateDebut', 'dateFin', 'heureDebut', 'heureFin', 'lieu']
    }
  })
  async create(@Body() body: {
    titre: string;
    description: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    heureDebut: string;
    heureFin: string;
    lieu: string;
    maxParticipants?: number;
    prix?: number;
  }, @Req() req: Request) {
    try {
      // TODO: Vérifier les droits admin

      const parsedData = {
        ...body,
        dateDebut: typeof body.dateDebut === 'string' ? new Date(body.dateDebut) : body.dateDebut,
        dateFin: typeof body.dateFin === 'string' ? new Date(body.dateFin) : body.dateFin,
      };

      return await this.formationService.create(parsedData);
    } catch (error: any) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la création de la formation: ${error.message}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all formations' })
  @ApiResponse({ status: 200, description: 'Return all formations.' })
  async findAll() {
    try {
      return await this.formationService.findAll();
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la récupération des formations: ${errorMessage}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active formations' })
  @ApiResponse({ status: 200, description: 'Return all active formations.' })
  async findActive() {
    try {
      return await this.formationService.findActive();
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la récupération des formations actives: ${errorMessage}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a formation by id' })
  @ApiResponse({ status: 200, description: 'Return the formation.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.formationService.findOne(+id);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: errorMessage,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a formation (Admin only)' })
  async update(@Param('id') id: string, @Body() body: {
    titre?: string;
    description?: string;
    dateDebut?: Date | string;
    dateFin?: Date | string;
    heureDebut?: string;
    heureFin?: string;
    lieu?: string;
    maxParticipants?: number;
    prix?: number;
    statut?: string;
  }) {
    try {
      // TODO: Vérifier les droits admin

      const parsedData: any = { ...body };
      
      if (body.dateDebut) {
        parsedData.dateDebut = typeof body.dateDebut === 'string' ? new Date(body.dateDebut) : body.dateDebut;
      }
      if (body.dateFin) {
        parsedData.dateFin = typeof body.dateFin === 'string' ? new Date(body.dateFin) : body.dateFin;
      }

      return await this.formationService.update(+id, parsedData);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la mise à jour de la formation: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a formation (Admin only)' })
  async remove(@Param('id') id: string) {
    try {
      // TODO: Vérifier les droits admin
      return await this.formationService.remove(+id);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la suppression de la formation: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Endpoints pour les inscriptions
  @Post(':id/inscription')
  @ApiOperation({ summary: 'Subscribe to a formation' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        notes: { type: 'string', example: 'Notes spécifiques pour cette inscription' }
      }
    }
  })
  async inscrire(@Param('id') id: string, @Body() body: { notes?: string }, @Req() req: Request) {
    try {
      // Récupérer l'ID utilisateur depuis le cookie
      const userId = req.cookies['userId'];
      
      if (!userId) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Utilisateur non connecté',
          },
          HttpStatus.UNAUTHORIZED
        );
      }

      return await this.formationService.inscrireUtilisateur(+id, +userId, body.notes);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de l'inscription: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('user/inscriptions')
  @ApiOperation({ summary: 'Get user inscriptions' })
  async getInscriptionsUtilisateur(@Req() req: Request) {
    try {
      const userId = req.cookies['userId'];
      
      if (!userId) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Utilisateur non connecté',
          },
          HttpStatus.UNAUTHORIZED
        );
      }

      return await this.formationService.getInscriptionsUtilisateur(+userId);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la récupération des inscriptions: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('admin/inscriptions')
  @ApiOperation({ summary: 'Get all inscriptions (Admin only)' })
  async getAllInscriptions(@Req() req: Request) {
    try {
      // TODO: Vérifier les droits admin
      return await this.formationService.getAllInscriptions();
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la récupération des inscriptions: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch('inscription/:inscriptionId/confirmer')
  @ApiOperation({ summary: 'Confirm an inscription (Admin only)' })
  async confirmerInscription(@Param('inscriptionId') inscriptionId: string) {
    try {
      // TODO: Vérifier les droits admin
      return await this.formationService.confirmerInscription(+inscriptionId);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la confirmation: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('inscriptions/:inscriptionId/annuler')
  @ApiOperation({ summary: 'Cancel an inscription (Admin only)' })
  async annulerInscription(@Param('inscriptionId') inscriptionId: string) {
    try {
      // TODO: Vérifier les droits admin ou propriétaire
      return await this.formationService.annulerInscription(+inscriptionId);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de l'annulation de l'inscription: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Endpoints pour les likes
  @Post(':id/like')
  @ApiOperation({ summary: 'Like/Unlike a formation' })
  async toggleLike(@Param('id') id: string, @Req() req: Request) {
    try {
      let userId = req.cookies['userId'];
      
      // Si l'utilisateur n'est pas connecté, créer un utilisateur anonyme temporaire
      if (!userId) {
        const anonymousId = await this.formationService.createAnonymousUser(req);
        userId = anonymousId;
      }

      return await this.formationService.toggleLike(+id, +userId);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors du like: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id/likes')
  @ApiOperation({ summary: 'Get likes for a formation' })
  async getLikes(@Param('id') id: string) {
    try {
      return await this.formationService.getLikes(+id);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la récupération des likes: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('user/likes')
  @ApiOperation({ summary: 'Get user liked formations' })
  async getUserLikes(@Req() req: Request) {
    try {
      const userId = req.cookies['userId'];
      
      if (!userId) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Utilisateur non connecté',
          },
          HttpStatus.UNAUTHORIZED
        );
      }

      return await this.formationService.getUserLikes(+userId);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la récupération des likes utilisateur: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Endpoints pour les commentaires
  @Post(':id/comment')
  @ApiOperation({ summary: 'Add a comment to a formation' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', example: 'Excellente formation, très enrichissante!' },
        authorName: { type: 'string', example: 'Nom de l\'auteur (optionnel)' }
      },
      required: ['content']
    }
  })
  async addComment(@Param('id') id: string, @Body() body: { content: string; authorName?: string }, @Req() req: Request) {
    try {
      let userId = req.cookies['userId'];
      
      // Si l'utilisateur n'est pas connecté, créer un utilisateur anonyme temporaire
      if (!userId) {
        const anonymousId = await this.formationService.createAnonymousUser(req, body.authorName);
        userId = anonymousId;
      }

      if (!body.content?.trim()) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Le contenu du commentaire est requis',
          },
          HttpStatus.BAD_REQUEST
        );
      }

      return await this.formationService.addComment(+id, +userId, body.content.trim());
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de l'ajout du commentaire: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get comments for a formation' })
  async getComments(@Param('id') id: string) {
    try {
      return await this.formationService.getComments(+id);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la récupération des commentaires: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('comments/:commentId')
  @ApiOperation({ summary: 'Delete a comment (Admin or comment owner)' })
  async deleteComment(@Param('commentId') commentId: string, @Req() req: Request) {
    try {
      const userId = req.cookies['userId'];
      
      if (!userId) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Utilisateur non connecté',
          },
          HttpStatus.UNAUTHORIZED
        );
      }

      return await this.formationService.deleteComment(+commentId, +userId);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la suppression du commentaire: ${errorMessage}`,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
