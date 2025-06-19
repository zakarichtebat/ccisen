import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { PlageHoraireModule } from './plage-horaire/plage-horaire.module';
import { FormationModule } from './formation/formation.module';
import { ContactModule } from './contact/contact.module';
import { DocumentModule } from './document/document.module';
import { AvisModule } from './avis/avis.module';
import { ReclamationModule } from './reclamation/reclamation.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ServiceModule,
    RendezVousModule,
    PlageHoraireModule,
    FormationModule,
    ContactModule,
    DocumentModule,
    AvisModule,
    ReclamationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
