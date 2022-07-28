import { IsString, MaxLength } from 'class-validator';

export class AddNewEducationalLevel {
  @IsString()
  @MaxLength(250)
  name!: string;
}
