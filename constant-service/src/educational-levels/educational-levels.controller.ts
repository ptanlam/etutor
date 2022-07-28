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
import { AddNewEducationalLevel } from './commands/add-new-educational-level';
import { DeleteEducationalLevel } from './commands/delete-educational-level';
import { UpdateEducationalLevel } from './commands/update-educational-level';
import { GetEducationalLevelById } from './queries/get-educational-level-by-id';
import { GetEducationalLevelByName } from './queries/get-educational-level-by-name';
import { GetEducationalLevelList } from './queries/get-educational-level-list';

@Controller('educational-levels')
export class EducationalLevelsController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Get()
  public getList() {
    return this._commandBus.execute(new GetEducationalLevelList());
  }

  @Get(':id')
  public async getById(
    @Param() getEducationalLevelById: GetEducationalLevelById,
  ) {
    const educationalLevel = await this._commandBus.execute(
      getEducationalLevelById,
    );

    if (!educationalLevel)
      throw new NotFoundException(
        `Educational level with id ${getEducationalLevelById.id} cannot be found`,
      );

    return educationalLevel;
  }

  @Post()
  public async addNew(@Body() addNewEducationalLevel: AddNewEducationalLevel) {
    const educationalLevel = await this._commandBus.execute(
      new GetEducationalLevelByName(addNewEducationalLevel.name),
    );

    if (!!educationalLevel)
      throw new BadRequestException(
        `Educational level ${addNewEducationalLevel.name} has already exist.`,
      );

    return await this._commandBus.execute(addNewEducationalLevel);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateEducationalLevel: UpdateEducationalLevel,
  ) {
    const educationalLevel = await this._commandBus.execute(
      new GetEducationalLevelByName(updateEducationalLevel.name),
    );

    if (!!educationalLevel)
      throw new BadRequestException(
        `Educational level ${updateEducationalLevel.name} has already exist.`,
      );

    updateEducationalLevel.id = id;
    const updatedEducationalLevel = await this._commandBus.execute(
      updateEducationalLevel,
    );

    if (!updatedEducationalLevel)
      throw new NotFoundException(
        `Educational level with id ${id} cannot be found.`,
      );

    return updatedEducationalLevel;
  }

  @Delete(':id')
  public async delete(@Param() deleteEducationalLevel: DeleteEducationalLevel) {
    const educationalLevel = await this._commandBus.execute(
      deleteEducationalLevel,
    );

    if (educationalLevel === null)
      throw new BadRequestException(
        `Educational level with id ${deleteEducationalLevel.id} does not exist.`,
      );

    return educationalLevel;
  }
}
