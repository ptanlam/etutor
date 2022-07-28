import { IsString } from 'class-validator';

export class DeleteCurrency {
  @IsString()
  id!: string;
}
