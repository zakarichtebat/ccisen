import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    nom: string;
    description: string;
    duree: number;
  }) {
    return this.prisma.service.create({ 
      data: { ...data, updatedAt: new Date() } 
    });
  }

  async findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(id: number) {
    return this.prisma.service.findUnique({ where: { id } });
  }

  async update(id: number, data: {
    nom?: string;
    description?: string;
    duree?: number;
  }) {
    return this.prisma.service.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    return this.prisma.service.delete({ where: { id } });
  }
} 