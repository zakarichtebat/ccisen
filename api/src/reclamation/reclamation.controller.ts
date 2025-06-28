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
import { AuthService } from '../auth/auth.service';
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
  constructor(
    private readonly reclamationService: ReclamationService,
    private readonly authService: AuthService,
  ) {}

  // Helper method to get current user from cookies
  private async getCurrentUser(req: any) {
    const userId = req.cookies?.['userId'];
    if (!userId) {
      return null;
    }
    
    const user = await this.authService.getUserById(parseInt(userId));
    return user;
  }

  // Helper method to check if user is admin
  private isAdmin(user: any): boolean {
    return user && (user.role === 'admin' || user.role === 'administrateur');
  }

  @Post()
  async create(@Body() createReclamationDto: CreateReclamationDto, @Request() req) {
    try {
      const user = await this.getCurrentUser(req);
      if (!user) {
        throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
      }
      
      return await this.reclamationService.create(createReclamationDto, user.id);
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
      const user = await this.getCurrentUser(req);
      
      if (!user) {
        throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
      }
      
      console.log('🔍 Récupération réclamations:');
      console.log('- Utilisateur:', `${user.nom} ${user.prenom} (ID: ${user.id}, Role: ${user.role})`);
      console.log('- Filtres reçus:', filters);
      
      // Filtrer selon le rôle de l'utilisateur
      let finalFilters = { ...filters };
      
      if (this.isAdmin(user)) {
        console.log('- Utilisateur ADMIN: accès à toutes les réclamations');
        // Les admins voient toutes les réclamations, pas de filtre userId
      } else {
        console.log('- Utilisateur NORMAL: accès uniquement à ses réclamations');
        // Les utilisateurs normaux ne voient que leurs réclamations
        finalFilters.userId = user.id;
      }
      
      console.log('- Filtres finaux:', finalFilters);
      
      const result = await this.reclamationService.findAll(finalFilters);
      console.log('- Nombre de réclamations trouvées:', Array.isArray(result) ? result.length : 'Format inattendu');
      
      return result;
    } catch (error: any) {
      console.error('❌ Erreur dans findAll:', error.message);
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des réclamations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getStats(@Request() req) {
    try {
      const user = await this.getCurrentUser(req);
      
      console.log('📊 Récupération statistiques:');
      console.log('- Utilisateur:', user ? `${user.nom} ${user.prenom} (Role: ${user.role})` : 'Non connecté');
      
      // TEMPORAIRE: Autoriser l'accès aux stats pour tout utilisateur connecté
      if (!user) {
        console.log('❌ Accès refusé aux stats - utilisateur non connecté');
        throw new HttpException('Utilisateur non connecté', HttpStatus.UNAUTHORIZED);
      }
      
      console.log('✅ Utilisateur connecté - récupération des stats...');
      const stats = await this.reclamationService.getStats();
      console.log('📈 Stats calculées:', stats);
      
      return stats;
    } catch (error: any) {
      console.error('❌ Erreur dans getStats:', error.message);
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des statistiques',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('numero/:numero')
  async findByNumero(@Param('numero') numeroReclamation: string, @Request() req) {
    try {
      const user = await this.getCurrentUser(req);
      const reclamation = await this.reclamationService.findByNumero(numeroReclamation);
      
      if (!reclamation) {
        throw new HttpException('Réclamation non trouvée', HttpStatus.NOT_FOUND);
      }

      // Vérifier les droits d'accès
      if (user && !this.isAdmin(user) && reclamation.userId !== user.id) {
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
      const user = await this.getCurrentUser(req);
      
      // Vérifier les droits d'accès
      if (!user || (!this.isAdmin(user) && user.id !== userId)) {
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
      const user = await this.getCurrentUser(req);
      
      // Seuls les admins peuvent voir cette route
      if (!user || !this.isAdmin(user)) {
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
      const user = await this.getCurrentUser(req);
      const reclamation = await this.reclamationService.findOne(id);
      
      if (!reclamation) {
        throw new HttpException('Réclamation non trouvée', HttpStatus.NOT_FOUND);
      }

      // Vérifier les droits d'accès
      if (user && !this.isAdmin(user) && reclamation.userId !== user.id) {
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
      const user = await this.getCurrentUser(req);
      const userId = this.isAdmin(user) ? undefined : user?.id;
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
      const user = await this.getCurrentUser(req);
      
      // Seuls les admins peuvent assigner des réclamations
      if (!user || !this.isAdmin(user)) {
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
      const user = await this.getCurrentUser(req);
      
      // Seuls les admins peuvent traiter des réclamations
      if (!user || !this.isAdmin(user)) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return await this.reclamationService.traiter(id, traiterDto, user.id);
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
      const user = await this.getCurrentUser(req);
      
      // Seuls les admins peuvent fermer des réclamations
      if (!user || !this.isAdmin(user)) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return await this.reclamationService.close(id, user.id, closeDto.commentaire);
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
      const user = await this.getCurrentUser(req);
      
      return await this.reclamationService.addSatisfaction(
        id, 
        satisfactionDto.satisfaction, 
        satisfactionDto.commentaire, 
        user?.id
      );
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de l\'ajout de la satisfaction',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusUpdate: { statut: string; commentaire?: string },
    @Request() req,
  ) {
    try {
      const user = await this.getCurrentUser(req);
      
      if (!user) {
        throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
      }
      
      console.log(`🔄 Changement de statut réclamation ${id}:`, statusUpdate);
      
      // Vérifier que le statut est valide
      const validStatuts = ['ouverte', 'en_cours', 'resolue', 'fermee'];
      if (!validStatuts.includes(statusUpdate.statut)) {
        throw new HttpException('Statut invalide', HttpStatus.BAD_REQUEST);
      }
      
      // Mettre à jour la réclamation
      const result = await this.reclamationService.updateStatus(id, statusUpdate.statut, user.id, statusUpdate.commentaire);
      
      console.log('✅ Statut mis à jour avec succès');
      return result;
    } catch (error: any) {
      console.error('❌ Erreur updateStatus:', error.message);
      throw new HttpException(
        error.message || 'Erreur lors de la mise à jour du statut',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
} 