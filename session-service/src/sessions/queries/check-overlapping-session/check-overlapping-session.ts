import { IsNumber, IsString } from 'class-validator';

export class CheckOverlappingSession {
  @IsNumber()
  readonly startDate: number;

  @IsNumber()
  readonly endDate: number;

  @IsString()
  readonly startAt: string;

  @IsString()
  readonly endAt: string;

  @IsString()
  readonly learningDays: string;

  @IsString()
  readonly ownerId: string;

  constructor(
    startDate: number,
    endDate: number,
    startAt: string,
    endAt: string,
    learningDays: string,
    ownerId: string,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.startAt = startAt;
    this.endAt = endAt;
    this.learningDays = learningDays;
    this.ownerId = ownerId;
  }
}
