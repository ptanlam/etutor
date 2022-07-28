import { IsDate, IsIn, IsString, MaxLength } from 'class-validator';

type TargetType = 'owner' | 'course' | 'enrollment';

export class GetSessionsForTarget {
  @IsString()
  @MaxLength(50)
  readonly targetId: string;

  @IsIn(['owner', 'course', 'enrollment'])
  readonly targetType: TargetType;

  @IsDate()
  readonly from: Date;

  @IsDate()
  readonly to: Date;

  constructor(targetType: TargetType, targetId: string, from: Date, to: Date) {
    this.targetType = targetType;
    this.targetId = targetId;
    this.from = from;
    this.to = to;
  }
}
