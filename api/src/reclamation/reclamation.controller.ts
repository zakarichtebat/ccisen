import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ReclamationService } from './reclamation.service';
import {
  CreateReclamationDto,
  UpdateReclamationDto,
  TraiterReclamationDto,
  ReclamationFilterDto,
  AssignReclamationDto,
  CloseReclamationDto,
  SatisfactionDto,
} from './dto/reclamation.dto';

@Controller('reclamations')
export class ReclamationController {
  constructor(private readonly reclamationService: ReclamationService) {}

  @Post()
  async create(@Body() createReclamationDto: CreateReclamationDto, @Request() req) {
    try {
      const userId = req.user?.id || req.body.userId;
      if (!userId) {
        throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
      }
      
      return await this.reclamationService.create(createReclamationDto, userId);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la création de la réclamation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query() filters: ReclamationFilterDto, @Request() req) {
    try {
      // Si l'utilisateur n'est pas admin, ne voir que ses propres réclamations
      if (req.user?.role !== 'admin') {
        filters.userId = req.user?.id;
      }
      
      return await this.reclamationService.findAll(filters);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des réclamations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getStats(@Request() req) {
    try {
      // Seuls les admins peuvent voir les statistiques
      if (req.user?.role !== 'admin') {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return await this.reclamationService.getStats();
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des statistiques',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('numero/:numero')
  async findByNumero(@Param('numero') numeroReclamation: string, @Request() req) {
    try {
      const reclamation = await this.reclamationService.findByNumero(numeroReclamation);
      
      if (!reclamation) {
        throw new HttpException('Réclamation non trouvée', HttpStatus.NOT_FOUND);
      }

      // Vérifier les droits d'accès
      if (req.user?.role !== 'admin' && reclamation.userId !== req.user?.id) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return reclamation;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération de la réclamation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number, @Query() filters: ReclamationFilterDto, @Request() req) {
    try {
      // Vérifier les droits d'accès
      if (req.user?.role !== 'admin' && req.user?.id !== userId) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return await this.reclamationService.findAll({ ...filters, userId });
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des réclamations de l\'utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('admin/:adminId')
  async findByAdmin(@Param('adminId', ParseIntPipe) adminId: number, @Query() filters: ReclamationFilterDto, @Request() req) {
    try {
      // Seuls les admins peuvent voir cette route
      if (req.user?.role !== 'admin') {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return await this.reclamationService.findAll({ ...filters, adminTraitantId: adminId });
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des réclamations de l\'administrateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    try {
      const reclamation = await this.reclamationService.findOne(id);
      
      if (!reclamation) {
        throw new HttpException('Réclamation non trouvée', HttpStatus.NOT_FOUND);
      }

      // Vérifier les droits d'accès
      if (req.user?.role !== 'admin' && reclamation.userId !== req.user?.id) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return reclamation;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération de la réclamation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReclamationDto: UpdateReclamationDto,
    @Request() req,
  ) {
    try {
      const userId = req.user?.role === 'admin' ? undefined : req.user?.id;
      return await this.reclamationService.update(id, updateReclamationDto, userId);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la mise à jour de la réclamation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/assign')
  async assignToAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignDto: AssignReclamationDto,
    @Request() req,
  ) {
    try {
      // Seuls les admins peuvent assigner des réclamations
      if (req.user?.role !== 'admin') {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return await this.reclamationService.assignToAdmin(id, assignDto.adminId);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de l\'assignation de la réclamation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/traiter')
  async traiter(
    @Param('id', ParseIntPipe) id: number,
    @Body() traiterDto: TraiterReclamationDto,
    @Request() req,
  ) {
    try {
      // Seuls les admins peuvent traiter des réclamations
      if (req.user?.role !== 'admin') {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      const adminId = req.user?.id;
      return await this.reclamationService.traiter(id, traiterDto, adminId);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors du traitement de la réclamation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/close')
  async close(
    @Param('id', ParseIntPipe) id: number,
    @Body() closeDto: CloseReclamationDto,
    @Request() req,
  ) {
    try {
      // Seuls les admins peuvent fermer des réclamations
      if (req.user?.role !== 'admin') {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      const adminId = req.user?.id;
      return await this.reclamationService.close(id, adminId, closeDto.commentaire);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la fermeture de la réclamation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/satisfaction')
  async addSatisfaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() satisfactionDto: SatisfactionDto,
    @Request() req,
  ) {
    try {
      const userId = req.user?.id;
      return await this.reclamationService.addSatisfaction(
        id,
        satisfactionDto.satisfaction,
        satisfactionDto.commentaire,
        userId,
      );
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de l\'ajout de l\'évaluation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
} 