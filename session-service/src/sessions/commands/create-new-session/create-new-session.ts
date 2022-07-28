import { IsDate, IsString, MaxLength } from 'class-validator';

export class CreateNewSession {
  @IsString()
  @MaxLength(50)
  readonly ownerId: string;

  @IsString()
  @MaxLength(50)
  readonly courseId: string;

  @IsString()
  @MaxLength(50)
  readonly enrollmentId: string;

  @IsDate()
  readonly from: Date;

  @IsDate()
  readonly to: Date;

  constructor(
    ownerId: string,
    courseId: string,
    enrollmentId: string,
    from: Date,
    to: Date,
  ) {
    this.ownerId = ownerId;
    this.courseId = courseId;
    this.enrollmentId = enrollmentId;
    this.from = from;
    this.to = to;
  }
}
