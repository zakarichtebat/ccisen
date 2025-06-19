import { Module } from '@nestjs/common';
import { ReclamationController } from './reclamation.controller';
import { ReclamationService } from './reclamation.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReclamationController],
  providers: [ReclamationService],
  exports: [ReclamationService],
})
export class ReclamationModule {} 