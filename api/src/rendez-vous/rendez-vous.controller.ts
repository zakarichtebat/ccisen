import { Controller, Get, Post, Body, Param, Delete, Patch, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('rendez-vous')
@Controller('rendez-vous')
export class RendezVousController {
  constructor(private readonly rendezVousService: RendezVousService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rendez-vous' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        date: { type: 'string', format: 'date', example: '2025-06-01' },
        heure: { type: 'string', example: '10:00' },
        notes: { type: 'string', example: 'Notes spécifiques pour ce rendez-vous' },
        userId: { type: 'number', example: 1 },
        serviceId: { type: 'number', example: 1 }
      },
      required: ['date', 'heure', 'userId', 'serviceId']
    }
  })
  @ApiResponse({ status: 201, description: 'Rendez-vous successfully created.' })
  async create(@Body() body: {
    date: Date | string;
    heure: string;
    status?: string;
    notes?: string;
    userId: number;
    serviceId: number;
  }) {
    try {
      // Si date est une chaîne, la convertir en objet Date
      const parsedData = {
        ...body,
        date: typeof body.date === 'string' ? new Date(body.date) : body.date,
        userId: Number(body.userId),
        serviceId: Number(body.serviceId)
      };
      
      console.log('Création de rendez-vous avec données:', parsedData);
      
      const result = await this.rendezVousService.create(parsedData);
      return result;
    } catch (error: any) {
      console.error('Erreur lors de la création du rendez-vous:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la création du rendez-vous: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all rendez-vous or filter by user' })
  @ApiResponse({ status: 200, description: 'Return all rendez-vous.' })
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.rendezVousService.findByUser(+userId);
    }
    return this.rendezVousService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rendez-vous by id' })
  @ApiResponse({ status: 200, description: 'Return the rendez-vous.' })
  findOne(@Param('id') id: string) {
    return this.rendezVousService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rendez-vous' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        date: { type: 'string', format: 'date', example: '2025-06-02' },
        heure: { type: 'string', example: '11:00' },
        status: { type: 'string', example: 'confirmé' },
        notes: { type: 'string', example: 'Notes mises à jour' },
        serviceId: { type: 'number', example: 2 }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Rendez-vous successfully updated.' })
  async update(@Param('id') id: string, @Body() body: {
    date?: Date | string;
    heure?: string;
    status?: string;
    notes?: string;
    serviceId?: number;
  }) {
    try {
      // Préparer les données en convertissant les types
      const parsedData: {
        date?: Date;
        heure?: string;
        status?: string;
        notes?: string;
        serviceId?: number;
      } = {
        heure: body.heure,
        status: body.status,
        notes: body.notes
      };
      
      // Convertir date si elle existe
      if (body.date) {
        parsedData.date = typeof body.date === 'string' ? new Date(body.date) : body.date;
      }
      
      // Convertir serviceId si présent
      if (body.serviceId) {
        parsedData.serviceId = Number(body.serviceId);
      }
      
      console.log('Mise à jour du rendez-vous', id, 'avec données:', parsedData);
      
      // Vérifier si le rendez-vous existe
      const rendezVous = await this.rendezVousService.findOne(+id);
      if (!rendezVous) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Rendez-vous avec l'ID ${id} non trouvé`,
          },
          HttpStatus.NOT_FOUND
        );
      }
      
      const result = await this.rendezVousService.update(+id, parsedData);
      return result;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du rendez-vous:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur lors de la mise à jour du rendez-vous: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rendez-vous' })
  @ApiResponse({ status: 200, description: 'Rendez-vous successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.rendezVousService.remove(+id);
  }
} 