import { IsString, IsNumber, IsOptional, IsBoolean, Min, Max, IsIn } from 'class-validator';

export class CreateAvisDto {
  @IsString()
  sujet!: string;

  @IsString()
  commentaire!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  note!: number;

  @IsString()
  @IsIn(['formation', 'document', 'rendez-vous', 'general'])
  typeService!: string;

  @IsOptional()
  @IsNumber()
  serviceId?: number;
}

export class UpdateAvisDto {
  @IsOptional()
  @IsString()
  sujet?: string;

  @IsOptional()
  @IsString()
  commentaire?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  note?: number;

  @IsOptional()
  @IsString()
  @IsIn(['formation', 'document', 'rendez-vous', 'general'])
  typeService?: string;

  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @IsOptional()
  @IsString()
  @IsIn(['actif', 'masque', 'supprime'])
  statut?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class AvisFilterDto {
  @IsOptional()
  @IsString()
  typeService?: string;

  @IsOptional()
  @IsString()
  statut?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsOptional()
  @IsNumber()
  userId?: number;

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