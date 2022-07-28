import { IsString } from 'class-validator';

export class GetEducationalLevelById {
  @IsString()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
