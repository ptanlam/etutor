import { IsString } from 'class-validator';

export class DeleteGender {
  @IsString()
  id!: string;
}
