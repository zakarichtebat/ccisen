import { Module } from '@nestjs/common';
import { ReclamationController } from './reclamation.controller';
import { ReclamationService } from './reclamation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ReclamationController],
  providers: [ReclamationService],
  exports: [ReclamationService],
})
export class ReclamationModule {} 