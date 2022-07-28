import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddNewAcademicRank } from './commands/add-new-academic-rank';
import { DeleteAcademicRank } from './commands/delete-academic-rank';
import { UpdateAcademicRank } from './commands/update-academic-rank';
import { GetAcademicRankByName } from './queries/get-academic-rank-by-name';
import { GetAcademicRankList } from './queries/get-academic-rank-list';

@Controller('academic-ranks')
export class AcademicRanksController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Get()
  public getList() {
    return this._commandBus.execute(new GetAcademicRankList());
  }

  @Post()
  public async addNew(@Body() addNewAcademicRank: AddNewAcademicRank) {
    const academicRank = await this._commandBus.execute(
      new GetAcademicRankByName(addNewAcademicRank.name),
    );

    if (!!academicRank)
      throw new BadRequestException(
        `Academic rank ${addNewAcademicRank.name} has already exist.`,
      );

    return this._commandBus.execute(addNewAcademicRank);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAcademicRank: UpdateAcademicRank,
  ) {
    updateAcademicRank.id = id;
    const [isExist, academicRank] = await this._commandBus.execute(
      updateAcademicRank,
    );

    if (isExist)
      throw new BadRequestException(
        `Academic rank ${updateAcademicRank.name} has already exist.`,
      );

    if (!academicRank)
      throw new NotFoundException(
        `Academic rank with id ${id} cannot be found.`,
      );

    return academicRank;
  }

  @Delete(':id')
  public async delete(@Param() deleteAcademicRank: DeleteAcademicRank) {
    const academicRank = await this._commandBus.execute(deleteAcademicRank);

    if (academicRank === null)
      throw new BadRequestException(
        `Academic rank with id ${deleteAcademicRank.id} does not exist.`,
      );

    return academicRank;
  }
}
