import { IsString } from 'class-validator';

export class GetGenderByName {
  @IsString()
  name!: string;

  constructor(name: string) {
    this.name = name;
  }
}
