import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userData: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
  }) {
    // Le mot de passe sera haché dans le service user (éviter le double hachage)
    const user = await this.userService.create(userData);

    // Le service user.create retourne déjà l'utilisateur sans mot de passe
    return user;
  }

  async login(email: string, motDePasse: string) {
    console.log(`🔐 Tentative de connexion pour: ${email}`);
    
    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log(`❌ Utilisateur non trouvé pour: ${email}`);
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    
    console.log(`✅ Utilisateur trouvé: ${user.nom} ${user.prenom} (ID: ${user.id})`);
    console.log(`📊 Statut de l'utilisateur: ${user.status}`);

    // Vérifier le statut de l'utilisateur AVANT de vérifier le mot de passe
    if (user.status === 'bloque') {
      console.log(`🚫 Utilisateur bloqué: ${email}`);
      throw new UnauthorizedException('Votre compte a été bloqué. Contactez l\'administrateur.');
    }
    
    if (user.status === 'inactif') {
      console.log(`😴 Utilisateur inactif: ${email}`);
      throw new UnauthorizedException('Votre compte est inactif. Contactez l\'administrateur.');
    }

    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    console.log(`🔓 Mot de passe valide: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      console.log(`❌ Mot de passe incorrect pour: ${email}`);
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const result = {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        numRegistreCommerce: user.numRegistreCommerce,
        secteurActivite: user.secteurActivite,
        telephone: user.telephone,
        adresse: user.adresse,
      },
    };
    
    console.log(`🎉 Connexion réussie pour: ${email} (ID: ${user.id})`);
    return result;
  }

  async getUserById(id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      return null;
    }
    
    // Le service user.findOne retourne déjà l'utilisateur sans mot de passe
    return user;
  }
} 