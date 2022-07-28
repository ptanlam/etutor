import { IsDate } from 'class-validator';
import { SessionDocument } from '../../schemas';

export class DelaySession {
  session!: SessionDocument;

  @IsDate()
  readonly from: Date;

  @IsDate()
  readonly to: Date;

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }
}
