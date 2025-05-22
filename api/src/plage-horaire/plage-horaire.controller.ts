import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PlageHoraireService } from './plage-horaire.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('plages-horaires')
@Controller('plages-horaires')
export class PlageHoraireController {
  constructor(private readonly plageHoraireService: PlageHoraireService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plage horaire' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        jour: { type: 'string', example: 'lundi' },
        heureDebut: { type: 'string', example: '09:00' },
        heureFin: { type: 'string', example: '17:00' }
      },
      required: ['jour', 'heureDebut', 'heureFin']
    }
  })
  @ApiResponse({ status: 201, description: 'Plage horaire successfully created.' })
  create(@Body() body: {
    jour: string;
    heureDebut: string;
    heureFin: string;
  }) {
    return this.plageHoraireService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all plages horaires' })
  @ApiResponse({ status: 200, description: 'Return all plages horaires.' })
  findAll() {
    return this.plageHoraireService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a plage horaire by id' })
  @ApiResponse({ status: 200, description: 'Return the plage horaire.' })
  findOne(@Param('id') id: string) {
    return this.plageHoraireService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a plage horaire' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        jour: { type: 'string', example: 'mardi' },
        heureDebut: { type: 'string', example: '10:00' },
        heureFin: { type: 'string', example: '18:00' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Plage horaire successfully updated.' })
  update(@Param('id') id: string, @Body() body: {
    jour?: string;
    heureDebut?: string;
    heureFin?: string;
  }) {
    return this.plageHoraireService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a plage horaire' })
  @ApiResponse({ status: 200, description: 'Plage horaire successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.plageHoraireService.remove(+id);
  }
} 