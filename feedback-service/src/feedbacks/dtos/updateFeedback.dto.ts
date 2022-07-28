import { PartialType, PickType } from '@nestjs/mapped-types';

import { AddNewFeedbackDto } from './addNewFeedback.dto';

export class UpdateFeedbackDto extends PartialType(
  PickType(AddNewFeedbackDto, ['content'] as const),
) {}
