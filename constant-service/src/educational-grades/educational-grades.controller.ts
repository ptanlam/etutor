import {
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
import { GetEducationalLevelById } from '../educational-levels/queries/get-educational-level-by-id';
import { AddNewEducationalGrade } from './commands/add-new-educational-grade';
import { DeleteEducationalGrade } from './commands/delete-educational-grade';
import { UpdateEducationalGrade } from './commands/update-educational-grade/update-educational-grade';
import { GetEducationalGradeByName } from './queries/get-education-grade-by-name';
import { GetEducationalGradeListForLevel } from './queries/get-educational-grade-list-for-level';

@Controller('educational-levels/:educationalLevelId/educational-grades')
export class EducationalGradesController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Get()
  public async getListForLevel(
    @Param() getEducationalGradeListForLevel: GetEducationalGradeListForLevel,
  ) {
    const educationalLevel = await this.getEducationalLevelById(
      getEducationalGradeListForLevel.educationalLevelId,
    );

    if (!educationalLevel)
      throw new NotFoundException(
        `Educational level with id ` +
          `${getEducationalGradeListForLevel.educationalLevelId} cannot be found`,
      );

    return this._commandBus.execute(getEducationalGradeListForLevel);
  }

  @Post()
  public async addNew(
    @Param('educationalLevelId')
    educationalLevelId: string,
    @Body() addNewEducationalGrade: AddNewEducationalGrade,
  ) {
    const educationalLevel = await this.getEducationalLevelById(
      educationalLevelId,
    );

    if (!educationalLevel)
      throw new NotFoundException(
        `Educational level with id ${educationalLevelId} cannot be found.`,
      );

    const educationalGrade = await this.getEducationalGradeByName(
      addNewEducationalGrade.name,
    );

    if (!!educationalGrade)
      throw new NotFoundException(
        `Educational grade with name ${addNewEducationalGrade.name} ` +
          `has already exist.`,
      );

    addNewEducationalGrade.educationalLevelId = educationalLevelId;
    const insertedEducationalGrade = await this._commandBus.execute(
      addNewEducationalGrade,
    );

    return insertedEducationalGrade;
  }

  @Patch(':id')
  public async update(
    @Param('educationalLevelId') educationalLevelId: string,
    @Param('id') id: string,
    @Body() updateEducationalGrade: UpdateEducationalGrade,
  ) {
    const educationalLevel = await this.getEducationalLevelById(
      educationalLevelId,
    );

    if (!educationalLevel)
      throw new NotFoundException(
        `Educational level with id ${educationalLevelId} cannot be found.`,
      );

    const educationalGrade = await this.getEducationalGradeByName(
      updateEducationalGrade.name,
    );

    if (!!educationalGrade)
      throw new NotFoundException(
        `Educational grade with name ${updateEducationalGrade.name} ` +
          `has already exist.`,
      );

    updateEducationalGrade.id = id;
    const updatedEducationalGrade = await this._commandBus.execute(
      updateEducationalGrade,
    );

    if (!updatedEducationalGrade)
      throw new NotFoundException(
        `Educational grade with id ${id} cannot be found.`,
      );

    return updateEducationalGrade;
  }

  @Delete(':id')
  public async delete(@Param() deleteEducationalGrade: DeleteEducationalGrade) {
    const educationalLevel = await this.getEducationalLevelById(
      deleteEducationalGrade.educationalLevelId,
    );

    if (!educationalLevel)
      throw new NotFoundException(
        `Educational level with id ${deleteEducationalGrade.educationalLevelId} cannot be found.`,
      );

    const educationalGrade = await this._commandBus.execute(
      deleteEducationalGrade,
    );

    if (!educationalGrade)
      throw new NotFoundException(
        `Educational grade with id ${deleteEducationalGrade.id} cannot be found.`,
      );

    return educationalGrade;
  }

  private async getEducationalLevelById(educationalLevelId: string) {
    const getEducationalLevelById = new GetEducationalLevelById(
      educationalLevelId,
    );
    const educationalLevel = await this._commandBus.execute(
      getEducationalLevelById,
    );
    return educationalLevel;
  }

  private getEducationalGradeByName(name: string) {
    const getEducationalGradeByName = new GetEducationalGradeByName(name);
    return this._commandBus.execute(getEducationalGradeByName);
  }
}
