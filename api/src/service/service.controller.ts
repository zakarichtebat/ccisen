import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nom: { type: 'string', example: 'Consultation juridique' },
        description: { type: 'string', example: 'Consultation avec un conseiller juridique' },
        duree: { type: 'number', example: 60 }
      },
      required: ['nom', 'description', 'duree']
    }
  })
  @ApiResponse({ status: 201, description: 'Service successfully created.' })
  create(@Body() body: {
    nom: string;
    description: string;
    duree: number;
  }) {
    return this.serviceService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: 200, description: 'Return all services.' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by id' })
  @ApiResponse({ status: 200, description: 'Return the service.' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nom: { type: 'string', example: 'Consultation juridique mise à jour' },
        description: { type: 'string', example: 'Consultation mise à jour avec un conseiller juridique' },
        duree: { type: 'number', example: 45 }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Service successfully updated.' })
  update(@Param('id') id: string, @Body() body: {
    nom?: string;
    description?: string;
    duree?: number;
  }) {
    return this.serviceService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service' })
  @ApiResponse({ status: 200, description: 'Service successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
} 