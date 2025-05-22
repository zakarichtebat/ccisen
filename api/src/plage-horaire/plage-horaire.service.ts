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
    return this.prisma.plageHoraire.create({ data });
  }

  async findAll() {
    return this.prisma.plageHoraire.findMany();
  }

  async findOne(id: number) {
    return this.prisma.plageHoraire.findUnique({ where: { id } });
  }

  async update(id: number, data: {
    jour?: string;
    heureDebut?: string;
    heureFin?: string;
  }) {
    return this.prisma.plageHoraire.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    return this.prisma.plageHoraire.delete({ where: { id } });
  }
} 