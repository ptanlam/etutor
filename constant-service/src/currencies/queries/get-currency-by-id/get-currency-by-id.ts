import { IsString } from 'class-validator';

export class GetCurrencyById {
  @IsString()
  id!: string;
}
