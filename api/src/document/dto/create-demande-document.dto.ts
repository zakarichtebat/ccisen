import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class CreateDemandeDocumentDto {
  @ApiProperty({
    description: 'ID du type de document demandé',
    example: 1
  })
  @IsNumber()
  typeDocumentId!: number;

  @ApiProperty({
    description: 'Nom du demandeur',
    example: 'Kouassi'
  })
  @IsString()
  nomDemandeur!: string;

  @ApiProperty({
    description: 'Prénom du demandeur',
    example: 'Jean'
  })
  @IsString()
  prenomDemandeur!: string;

  @ApiProperty({
    description: 'Email du demandeur',
    example: 'jean.kouassi@entreprise.ci'
  })
  @IsEmail()
  emailDemandeur!: string;

  @ApiProperty({
    description: 'Numéro de registre de commerce',
    example: 'RC-ABJ-2024-001'
  })
  @IsString()
  numRegistreCommerce!: string;

  @ApiProperty({
    description: 'Chemin vers le PDF du registre de commerce',
    required: false
  })
  @IsOptional()
  @IsString()
  registreCommercePdf?: string;

  @ApiProperty({
    description: 'Chemin vers la photo d\'identité',
    required: false
  })
  @IsOptional()
  @IsString()
  photoIdentite?: string;

  @ApiProperty({
    description: 'Autres documents (JSON array)',
    required: false
  })
  @IsOptional()
  @IsString()
  autresDocuments?: string;

  @ApiProperty({
    description: 'Commentaires du client',
    required: false
  })
  @IsOptional()
  @IsString()
  commentairesClient?: string;
} 