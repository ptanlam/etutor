import { IsString } from 'class-validator';

export class GetAcademicRankByName {
  @IsString()
  name!: string;

  constructor(name: string) {
    this.name = name;
  }
}
