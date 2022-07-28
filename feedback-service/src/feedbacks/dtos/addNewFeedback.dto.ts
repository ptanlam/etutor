import { IsNumber, IsString } from 'class-validator';

export class AddNewFeedbackDto {
  @IsString()
  content!: string;

  @IsString()
  ownerId!: string;

  @IsString()
  topicId!: string;
}
