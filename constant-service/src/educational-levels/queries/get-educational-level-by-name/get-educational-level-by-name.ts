import { IsString } from 'class-validator';

export class GetEducationalLevelByName {
  constructor(public name: string) {}
}
