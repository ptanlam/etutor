import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetFeedbackListDto } from '../dtos';

@Injectable()
export class GetFeedbackListDtoValidationPipe
  implements PipeTransform<GetFeedbackListDto>
{
  transform(value: GetFeedbackListDto, _: ArgumentMetadata) {
    const { topicId, ownerId } = value;

    if (!topicId && !ownerId)
      throw new BadRequestException(
        'One of topicId or ownerId has to be defined!',
      );

    return value;
  }
}
