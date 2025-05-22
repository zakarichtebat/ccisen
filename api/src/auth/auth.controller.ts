import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response, Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
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
    description: 'User successfully registered.',
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
  async register(@Body() userData: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
  }) {
    return this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com' },
        motDePasse: { type: 'string', example: 'password123' }
      },
      required: ['email', 'motDePasse']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in.',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            nom: { type: 'string', example: 'Doe' },
            prenom: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'john@example.com' },
            numRegistreCommerce: { type: 'string', example: 'RC123456' },
            secteurActivite: { type: 'string', example: 'Informatique' },
            telephone: { type: 'string', example: '+212 6XX-XXXXXX' },
            adresse: { type: 'string', example: '123 Rue Example, Ville' }
          }
        }
      }
    }
  })
  async login(
    @Body() loginData: { email: string; motDePasse: string },
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.login(loginData.email, loginData.motDePasse);
    
    // Définir un cookie avec l'ID de l'utilisateur
    response.cookie('userId', result.user.id, {
      httpOnly: false,  // Permettre au JavaScript côté client d'accéder au cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production' // Uniquement en HTTPS en production
    });
    
    console.log(`Utilisateur connecté: ${result.user.nom} ${result.user.prenom} (ID: ${result.user.id})`);
    
    return result;
  }
  
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out.' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('userId');
    return { message: 'Déconnexion réussie' };
  }
  
  @Post('current-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Returns current user info.' })
  async getCurrentUser(@Req() request: Request) {
    const userId = request.cookies['userId'];
    
    if (!userId) {
      return { isLoggedIn: false, user: null };
    }
    
    const user = await this.authService.getUserById(parseInt(userId));
    return { isLoggedIn: !!user, user };
  }
} 