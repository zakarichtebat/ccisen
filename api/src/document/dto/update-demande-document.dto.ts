import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateDemandeDocumentDto {
  @ApiProperty({
    description: 'Nouveau statut de la demande',
    enum: ['en_attente', 'en_cours', 'accepte', 'rejete', 'termine'],
    example: 'accepte'
  })
  @IsOptional()
  @IsString()
  @IsIn(['en_attente', 'en_cours', 'accepte', 'rejete', 'termine'])
  statut?: string;

  @ApiProperty({
    description: 'Motif de rejet (si statut = rejete)',
    required: false
  })
  @IsOptional()
  @IsString()
  motifRejet?: string;

  @ApiProperty({
    description: 'Notes internes de l\'administrateur',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
} 