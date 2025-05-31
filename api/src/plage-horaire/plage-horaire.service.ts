import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlageHoraireService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    jour: string;
    heureDebut: string;
    heureFin: string;
  }) {
    return this.prisma.plagehoraire.create({ 
      data: { ...data, updatedAt: new Date() } 
    });
  }

  async findAll() {
    return this.prisma.plagehoraire.findMany();
  }

  async findOne(id: number) {
    return this.prisma.plagehoraire.findUnique({ where: { id } });
  }

  async update(id: number, data: {
    jour?: string;
    heureDebut?: string;
    heureFin?: string;
  }) {
    return this.prisma.plagehoraire.update({
      where: { id },
      data: { ...data, updatedAt: new Date() }
    });
  }

  async remove(id: number) {
    return this.prisma.plagehoraire.delete({ where: { id } });
  }
} 