import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAvisDto, UpdateAvisDto, AvisFilterDto } from './dto/avis.dto';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  @Post()
  async create(@Body() createAvisDto: CreateAvisDto, @Request() req) {
    try {
      const userId = req.user?.id || req.body.userId;
      if (!userId) {
        throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
      }
      
      return await this.avisService.create(createAvisDto, userId);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la création de l\'avis',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query() filters: AvisFilterDto) {
    try {
      return await this.avisService.findAll(filters);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des avis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getStats() {
    try {
      return await this.avisService.getStats();
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des statistiques',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number, @Query() filters: AvisFilterDto) {
    try {
      return await this.avisService.findAll({ ...filters, userId });
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des avis de l\'utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const avis = await this.avisService.findOne(id);
      if (!avis) {
        throw new HttpException('Avis non trouvé', HttpStatus.NOT_FOUND);
      }
      return avis;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération de l\'avis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvisDto: UpdateAvisDto,
    @Request() req,
  ) {
    try {
      const userId = req.user?.id;
      return await this.avisService.update(id, updateAvisDto, userId);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la mise à jour de l\'avis',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/visibility')
  async toggleVisibility(@Param('id', ParseIntPipe) id: number, @Request() req) {
    try {
      // Vérifier si l'utilisateur est admin
      const userRole = req.user?.role;
      if (userRole !== 'admin') {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      
      return await this.avisService.toggleVisibility(id);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la modification de la visibilité',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    try {
      const userId = req.user?.id;
      return await this.avisService.remove(id, userId);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la suppression de l\'avis',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
} 