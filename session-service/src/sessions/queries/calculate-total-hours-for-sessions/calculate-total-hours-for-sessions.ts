import { IsDate, IsString, MaxLength } from 'class-validator';

export class CalculateTotalHoursForSessions {
  @IsDate()
  startDate!: Date;

  @IsDate()
  endDate!: Date;

  @MaxLength(5)
  startAt!: string;

  @MaxLength(5)
  endAt!: string;

  @IsString()
  //* monday,tuesday,thursday
  learningDays!: string;
}
