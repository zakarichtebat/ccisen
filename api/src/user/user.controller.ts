import { Controller, Get, Post, Body, Param, Delete, Patch, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nom: { type: 'string', example: 'Doe' },
        prenom: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'john@example.com' },
        motDePasse: { type: 'string', example: 'password123' },
        numRegistreCommerce: { type: 'string', example: 'RC123456' },
        secteurActivite: { type: 'string', example: 'Informatique' },
        telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
        adresse: { type: 'string', example: '123 Rue Example, Ville' }
      },
      required: ['nom', 'prenom', 'email', 'motDePasse', 'numRegistreCommerce', 'secteurActivite', 'telephone', 'adresse']
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        nom: { type: 'string', example: 'Doe' },
        prenom: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'john@example.com' },
        numRegistreCommerce: { type: 'string', example: 'RC123456' },
        secteurActivite: { type: 'string', example: 'Informatique' },
        telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
        adresse: { type: 'string', example: '123 Rue Example, Ville' },
        createdAt: { type: 'string', example: '2024-05-17T20:00:00.000Z' }
      }
    }
  })
  create(@Body() body: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
  }) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nom: { type: 'string', example: 'Doe Updated' },
        prenom: { type: 'string', example: 'John Updated' },
        email: { type: 'string', example: 'john.updated@example.com' },
        motDePasse: { type: 'string', example: 'newpassword123' },
        currentPassword: { type: 'string', example: 'oldpassword123' },
        numRegistreCommerce: { type: 'string', example: 'RC123456' },
        secteurActivite: { type: 'string', example: 'Informatique' },
        telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
        adresse: { type: 'string', example: '123 Rue Example, Ville' }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully updated.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        nom: { type: 'string', example: 'Doe Updated' },
        prenom: { type: 'string', example: 'John Updated' },
        email: { type: 'string', example: 'john.updated@example.com' },
        numRegistreCommerce: { type: 'string', example: 'RC123456' },
        secteurActivite: { type: 'string', example: 'Informatique' },
        telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
        adresse: { type: 'string', example: '123 Rue Example, Ville' },
        createdAt: { type: 'string', example: '2024-05-17T20:00:00.000Z' }
      }
    }
  })
  async update(@Param('id') id: string, @Body() body: {
    nom?: string;
    prenom?: string;
    email?: string;
    motDePasse?: string;
    currentPassword?: string;
    numRegistreCommerce?: string;
    secteurActivite?: string;
    telephone?: string;
    adresse?: string;
  }) {
    try {
      console.log(`Mise à jour de l'utilisateur ${id} avec données:`, { ...body, motDePasse: body.motDePasse ? '[MASQUÉ]' : undefined, currentPassword: body.currentPassword ? '[MASQUÉ]' : undefined });
      
      const result = await this.userService.update(+id, body);
      console.log(`Utilisateur ${id} mis à jour avec succès`);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, errorMessage);
      
      if (errorMessage === 'Utilisateur non trouvé') {
        throw new NotFoundException('Utilisateur non trouvé');
      } else if (errorMessage === 'Mot de passe actuel incorrect') {
        throw new BadRequestException('Mot de passe actuel incorrect');
      } else {
        throw new InternalServerErrorException('Erreur lors de la mise à jour du profil');
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
