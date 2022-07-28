import { IsString } from 'class-validator';

export class DeleteEducationalLevel {
  @IsString()
  id!: string;
}
