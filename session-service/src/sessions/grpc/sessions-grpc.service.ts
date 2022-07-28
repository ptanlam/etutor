import * as moment from 'moment';

import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import { CheckOverlappingSession } from '../queries/check-overlapping-session';
import { CheckOverlappingSessionRequest } from './requests';
import { CheckOverlappingSessionResponse } from './responses';

@Controller()
export class SessionsGrpcService {
  constructor(private readonly _commandBus: CommandBus) {}

  @GrpcMethod('Sessions')
  async checkOverlappingSession({
    startDate,
    endDate,
    startAt,
    endAt,
    learningDays,
    ownerId,
  }: CheckOverlappingSessionRequest): Promise<CheckOverlappingSessionResponse> {
    const checkOverlappingSession = new CheckOverlappingSession(
      parseFloat(startDate.toString()),
      parseFloat(endDate.toString()),
      startAt,
      endAt,
      learningDays,
      ownerId,
    );

    const hasSession = await this._commandBus.execute<
      CheckOverlappingSession,
      boolean
    >(checkOverlappingSession);

    return { hasSession };
  }
}
