import { IsString, IsNumber, IsOptional, IsIn, Min, Max } from 'class-validator';

export class CreateReclamationDto {
  @IsString()
  sujet!: string;

  @IsString()
  description!: string;

  @IsString()
  @IsIn(['service', 'document', 'formation', 'technique', 'autre'])
  typeReclamation!: string;

  @IsOptional()
  @IsString()
  @IsIn(['basse', 'normale', 'haute', 'urgente'])
  priorite?: string;

  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @IsOptional()
  @IsString()
  fichierJoint?: string;
}

export class UpdateReclamationDto {
  @IsOptional()
  @IsString()
  sujet?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['service', 'document', 'formation', 'technique', 'autre'])
  typeReclamation?: string;

  @IsOptional()
  @IsString()
  @IsIn(['basse', 'normale', 'haute', 'urgente'])
  priorite?: string;

  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @IsOptional()
  @IsString()
  fichierJoint?: string;
}

export class TraiterReclamationDto {
  @IsString()
  @IsIn(['ouverte', 'en_cours', 'resolue', 'fermee'])
  statut!: string;

  @IsOptional()
  @IsString()
  @IsIn(['basse', 'normale', 'haute', 'urgente'])
  priorite?: string;

  @IsOptional()
  @IsString()
  reponseAdmin?: string;
}

export class ReclamationFilterDto {
  @IsOptional()
  @IsString()
  typeReclamation?: string;

  @IsOptional()
  @IsString()
  statut?: string;

  @IsOptional()
  @IsString()
  priorite?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  adminTraitantId?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}

export class AssignReclamationDto {
  @IsNumber()
  adminId!: number;
}

export class CloseReclamationDto {
  @IsOptional()
  @IsString()
  commentaire?: string;
}

export class SatisfactionDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  satisfaction!: number;

  @IsOptional()
  @IsString()
  commentaire?: string;
} 