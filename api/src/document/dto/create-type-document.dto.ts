import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateTypeDocumentDto {
  @ApiProperty({
    description: 'Nom du type de document',
    example: 'Certificat d\'origine'
  })
  @IsString()
  nom!: string;

  @ApiProperty({
    description: 'Description détaillée du document',
    example: 'Certificat attestant l\'origine des marchandises'
  })
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Liste des documents requis (JSON)',
    example: '["Registre de commerce", "Facture commerciale", "Liste de colisage"]'
  })
  @IsString()
  documentsRequis!: string;

  @ApiProperty({
    description: 'Délai de traitement en jours ouvrés',
    example: 3
  })
  @IsNumber()
  @Min(1)
  delaiTraitement!: number;

  @ApiProperty({
    description: 'Prix en FCFA',
    example: 15000
  })
  @IsNumber()
  @Min(0)
  prix!: number;

  @ApiProperty({
    description: 'Document actif ou non',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  actif?: boolean;

  @ApiProperty({
    description: 'Template HTML/PDF du document',
    required: false
  })
  @IsOptional()
  @IsString()
  template?: string;
} 