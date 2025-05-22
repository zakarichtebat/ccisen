import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RendezVousService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    date: Date;
    heure: string;
    status?: string;
    notes?: string;
    userId: number;
    serviceId: number;
  }) {
    // Vérifier que la date est au moins 24h dans le futur
    const dateRendezVous = new Date(data.date);
    const [heures, minutes] = data.heure.split(':').map(Number);
    dateRendezVous.setHours(heures, minutes, 0, 0);
    
    const maintenant = new Date();
    const vingtQuatreHeures = 24 * 60 * 60 * 1000; // 24h en millisecondes
    
    if (dateRendezVous.getTime() - maintenant.getTime() < vingtQuatreHeures) {
      throw new BadRequestException('Le rendez-vous doit être pris au moins 24 heures à l\'avance');
    }

    // Vérifier s'il existe déjà un rendez-vous à la même date et heure
    const existingRendezVous = await this.prisma.rendezVous.findFirst({
      where: {
        date: data.date,
        heure: data.heure,
      }
    });

    if (existingRendezVous) {
      throw new ConflictException('Un rendez-vous existe déjà à cette date et heure');
    }

    return this.prisma.rendezVous.create({ 
      data,
      include: {
        user: true,
        service: true
      }
    });
  }

  async findAll() {
    return this.prisma.rendezVous.findMany({
      include: {
        user: true,
        service: true
      }
    });
  }

  async findByUser(userId: number) {
    return this.prisma.rendezVous.findMany({
      where: { userId },
      include: {
        service: true
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.rendezVous.findUnique({ 
      where: { id },
      include: {
        user: true,
        service: true
      }
    });
  }

  async update(id: number, data: {
    date?: Date;
    heure?: string;
    status?: string;
    notes?: string;
    serviceId?: number;
  }) {
    // Si la date ou l'heure est modifiée, vérifier s'il existe déjà un rendez-vous à cette date et heure
    if (data.date || data.heure) {
      const rendezVousToUpdate = await this.prisma.rendezVous.findUnique({
        where: { id }
      });

      if (!rendezVousToUpdate) {
        return null;
      }

      const dateToCheck = data.date || rendezVousToUpdate.date;
      const heureToCheck = data.heure || rendezVousToUpdate.heure;

      // Vérifier que la date est au moins 24h dans le futur (seulement si la date/heure change)
      if (data.date || data.heure) {
        const dateRendezVous = new Date(dateToCheck);
        const [heures, minutes] = heureToCheck.split(':').map(Number);
        dateRendezVous.setHours(heures, minutes, 0, 0);
        
        const maintenant = new Date();
        const vingtQuatreHeures = 24 * 60 * 60 * 1000; // 24h en millisecondes
        
        if (dateRendezVous.getTime() - maintenant.getTime() < vingtQuatreHeures) {
          throw new BadRequestException('Le rendez-vous doit être programmé au moins 24 heures à l\'avance');
        }
      }

      const existingRendezVous = await this.prisma.rendezVous.findFirst({
        where: {
          date: dateToCheck,
          heure: heureToCheck,
          id: { not: id } // Exclure le rendez-vous actuel
        }
      });

      if (existingRendezVous) {
        throw new ConflictException('Un rendez-vous existe déjà à cette date et heure');
      }
    }

    return this.prisma.rendezVous.update({
      where: { id },
      data,
      include: {
        user: true,
        service: true
      }
    });
  }

  async remove(id: number) {
    return this.prisma.rendezVous.delete({ where: { id } });
  }
} 