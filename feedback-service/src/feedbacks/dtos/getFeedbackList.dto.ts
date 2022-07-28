import { IsOptional, IsString } from 'class-validator';

import { PaginationMeta } from '../../shared/dtos';

export class GetFeedbackListDto extends PaginationMeta {
  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsString()
  topicId?: string;
}
