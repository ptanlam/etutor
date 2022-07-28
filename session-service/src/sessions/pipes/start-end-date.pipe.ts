import * as moment from 'moment';

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { CreateNewSession } from '../commands/create-new-session';
import { GetSessionsForTarget } from '../queries/get-sessions-for-target';

@Injectable()
export class StartEndDatePipe
  implements PipeTransform<CreateNewSession | GetSessionsForTarget>
{
  transform(
    value: CreateNewSession | GetSessionsForTarget,
    _: ArgumentMetadata,
  ) {
    const { from, to } = value;
    if (!this.checkDatesValid(moment(from), moment(to)))
      throw new BadRequestException('Start date cannot after end date.');
    return value;
  }

  private checkDatesValid(from: moment.Moment, to: moment.Moment) {
    return from.isSameOrBefore(to);
  }
}
