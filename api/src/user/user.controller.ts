import { Controller, Get, Post, Body, Param, Delete, Patch, NotFoundException, BadRequestException, InternalServerErrorException, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin/stats')
  @ApiOperation({ summary: 'Get user statistics for admin dashboard' })
  @ApiResponse({ status: 200, description: 'Return user statistics.' })
  async getAdminStats() {
    return this.userService.getAdminStats();
  }

  @Post('admin/search')
  @ApiOperation({ summary: 'Search users with filters' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        search: { type: 'string', description: 'Search term for name, email, etc.' },
        role: { type: 'string', description: 'Filter by role' },
        status: { type: 'string', description: 'Filter by status' },
        page: { type: 'number', default: 1 },
        limit: { type: 'number', default: 10 }
      }
    }
  })
  async searchUsers(@Body() searchParams: {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    return this.userService.searchUsers(searchParams);
  }

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
        adresse: { type: 'string', example: '123 Rue Example, Ville' },
        role: { type: 'string', example: 'client', description: 'Role: admin, client, moderateur' }
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
        role: { type: 'string', example: 'client' },
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
    role?: string;
  }) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    return this.userService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update user role (admin only)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        role: { type: 'string', example: 'admin', description: 'New role: admin, client, moderateur' }
      },
      required: ['role']
    }
  })
  async updateUserRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.userService.updateUserRole(+id, body.role);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update user status (admin only)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'actif', description: 'New status: actif, inactif, bloque' }
      },
      required: ['status']
    }
  })
  async updateUserStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.userService.updateUserStatus(+id, body.status);
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
        adresse: { type: 'string', example: '123 Rue Example, Ville' },
        role: { type: 'string', example: 'client' }
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
        role: { type: 'string', example: 'client' },
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
    role?: string;
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
  @ApiOperation({ summary: 'Delete a user (PERMANENTLY - removes all related data)' })
  @ApiResponse({ status: 200, description: 'User and all related data successfully deleted.' })
  async remove(@Param('id') id: string) {
    try {
      console.log(`🗑️ Tentative de suppression de l'utilisateur ID: ${id}`);
      const result = await this.userService.remove(+id);
      console.log(`✅ Utilisateur ${id} supprimé avec succès`);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error(`❌ Erreur lors de la suppression de l'utilisateur ${id}:`, errorMessage);
      console.error(`📊 Détails de l'erreur:`, error);
      
      if (errorMessage.includes('foreign key constraint')) {
        throw new BadRequestException('Impossible de supprimer cet utilisateur car il a des données liées (rendez-vous, réclamations, etc.). Veuillez d\'abord supprimer ces données ou désactiver l\'utilisateur.');
      } else if (errorMessage.includes('Record to delete does not exist')) {
        throw new NotFoundException('Utilisateur non trouvé');
      } else {
        throw new InternalServerErrorException(`Erreur lors de la suppression: ${errorMessage}`);
      }
    }
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a user (SAFER - blocks user without deleting data)' })
  @ApiResponse({ status: 200, description: 'User successfully deactivated.' })
  async deactivateUser(@Param('id') id: string) {
    try {
      console.log(`🚫 Tentative de désactivation de l'utilisateur ID: ${id}`);
      const result = await this.userService.deactivateUser(+id);
      console.log(`✅ Utilisateur ${id} désactivé avec succès`);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error(`❌ Erreur lors de la désactivation de l'utilisateur ${id}:`, errorMessage);
      
      if (errorMessage.includes('Record to update not found')) {
        throw new NotFoundException('Utilisateur non trouvé');
      } else {
        throw new InternalServerErrorException(`Erreur lors de la désactivation: ${errorMessage}`);
      }
    }
  }

  @Get('admin/export')
  @ApiOperation({ summary: 'Export users data as CSV' })
  @ApiResponse({ status: 200, description: 'Return CSV data.' })
  async exportUsers() {
    return this.userService.exportUsers();
  }
}
