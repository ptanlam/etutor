import { IsString, MaxLength } from 'class-validator';

export class AddNewCurrency {
  @IsString()
  @MaxLength(3)
  code!: string;

  @IsString()
  @MaxLength(50)
  name!: string;
}
