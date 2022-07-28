import { IsNumber, IsString } from 'class-validator';

export class GetNotificationListForUserDto {
  @IsString() userId!: string;
  @IsNumber() pageSize!: number;
  @IsNumber() pageNumber!: number;
}
