import { Module } from '@nestjs/common';
import { PlageHoraireController } from './plage-horaire.controller';
import { PlageHoraireService } from './plage-horaire.service';

@Module({
  controllers: [PlageHoraireController],
  providers: [PlageHoraireService],
  exports: [PlageHoraireService],
})
export class PlageHoraireModule {} 