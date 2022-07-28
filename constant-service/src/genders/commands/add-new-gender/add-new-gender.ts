import { IsString, MaxLength } from 'class-validator';

export class AddNewGender {
  @IsString()
  @MaxLength(250)
  name!: string;
}
