import { IsString } from 'class-validator';

export class UpdateSessionNotes {
  id!: string;

  @IsString()
  readonly notes: string;

  constructor(notes: string) {
    this.notes = notes;
  }
}
