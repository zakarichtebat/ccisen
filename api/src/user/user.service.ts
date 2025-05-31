import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
  }) {
    return this.prisma.user.create({ 
      data: { ...data, updatedAt: new Date() } 
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: {
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
    // Créer une copie des données sans currentPassword pour l'update
    const { currentPassword, ...updateData } = data;
    
    // Si un nouveau mot de passe est fourni, le valider et le hacher
    if (data.motDePasse) {
      // Récupérer l'utilisateur actuel pour vérifier le mot de passe
      const currentUser = await this.prisma.user.findUnique({ where: { id } });
      if (!currentUser) {
        throw new Error('Utilisateur non trouvé');
      }
      
      // Vérifier le mot de passe actuel si fourni
      if (currentPassword) {
        const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.motDePasse);
        if (!isPasswordValid) {
          throw new Error('Mot de passe actuel incorrect');
        }
      }
      
      // Hacher le nouveau mot de passe
      updateData.motDePasse = await bcrypt.hash(data.motDePasse, 10);
    }
    
    // Effectuer la mise à jour
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData
    });
    
    // Retourner l'utilisateur sans le mot de passe
    const { motDePasse, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}