import { IsString, MaxLength } from 'class-validator';

export class UpdateEducationalLevel {
  id!: string;

  @IsString()
  @MaxLength(250)
  name!: string;
}
