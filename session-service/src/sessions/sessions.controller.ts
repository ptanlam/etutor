import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CheckStudentAttendance } from './commands/check-student-attendance';
import { DelaySession } from './commands/delay-session';
import { UpdateSessionNotes } from './commands/update-session-notes';
import { StartEndDatePipe } from './pipes';
import { CalculateTotalHoursForSessions } from './queries/calculate-total-hours-for-sessions';
import { CheckOverlappingSession } from './queries/check-overlapping-session';
import { GetSessionById } from './queries/get-session-by-id';
import { GetSessionsForTarget } from './queries/get-sessions-for-target';
import { Session } from './schemas';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Get()
  async getListForTarget(
    @Query(new StartEndDatePipe()) getSessionsForTarget: GetSessionsForTarget,
  ) {
    return await this._commandBus.execute<GetSessionsForTarget, Session[]>(
      getSessionsForTarget,
    );
  }

  @Get('hours')
  async calculateNumberOfHours(
    @Query() calculateTotalHoursForSession: CalculateTotalHoursForSessions,
  ) {
    return this._commandBus.execute<CalculateTotalHoursForSessions, number>(
      calculateTotalHoursForSession,
    );
  }

  @Get('check-overlapping')
  checkOverlappingSessions(
    @Query() checkOverlappingSession: CheckOverlappingSession,
  ) {
    return this._commandBus.execute<CheckOverlappingSession, boolean>(
      checkOverlappingSession,
    );
  }

  @Patch(':id/notes')
  async update(
    @Param('id') id: string,
    @Body() updateSessionNotes: UpdateSessionNotes,
  ) {
    updateSessionNotes.id = id;
    const session = await this._commandBus.execute(updateSessionNotes);
    if (!session)
      throw new BadRequestException(`Session with id ${id} cannot be found!`);
    return session;
  }

  @Patch(':id/student-is-attended')
  async checkStudentAttendance(@Param('id') id: string) {
    const checkStudentAttendance = new CheckStudentAttendance(id);
    const session = await this._commandBus.execute(checkStudentAttendance);
    if (!session)
      throw new BadRequestException(`Session with id ${id} cannot be found!`);
    return session;
  }

  @Patch(':id/delay-to')
  async delaySession(
    @Param('id') id: string,
    @Body() delaySession: DelaySession,
  ) {
    const session = await this._commandBus.execute(new GetSessionById(id));
    if (!session)
      throw new BadRequestException(`Session with id ${id} cannot be found!`);

    delaySession.session = session;
    return this._commandBus.execute(delaySession);
  }
}
