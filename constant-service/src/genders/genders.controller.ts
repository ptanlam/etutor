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
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AddNewGender } from './commands/add-new-gender';
import { DeleteGender } from './commands/delete-gender';
import { UpdateGender } from './commands/update-gender';
import { GetGenderByName } from './queries/get-gender-by-name/get-gender-by-name';
import { GetGenderList } from './queries/get-gender-list';

@Controller('genders')
export class GendersController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Get()
  public getList() {
    return this._commandBus.execute(new GetGenderList());
  }

  @GrpcMethod('Constants', 'GetGenderName')
  public getGenderName() {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async add(@Body() addNewGender: AddNewGender) {
    const gender = await this._commandBus.execute(
      new GetGenderByName(addNewGender.name),
    );

    if (!!gender)
      throw new BadRequestException(
        `Gender ${addNewGender.name} has already exist.`,
      );

    return this._commandBus.execute(addNewGender);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateGender: UpdateGender,
  ) {
    updateGender.id = id;
    const [isExist, gender] = await this._commandBus.execute(updateGender);

    if (isExist)
      throw new BadRequestException(
        `Gender ${updateGender.name} has already exist.`,
      );

    if (!gender)
      throw new NotFoundException(`Gender with id ${id} cannot be found.`);

    return gender;
  }

  @Delete(':id')
  public async delete(@Param() deleteGender: DeleteGender) {
    const gender = await this._commandBus.execute(deleteGender);

    if (gender === null)
      throw new BadRequestException(
        `Gender with id ${deleteGender.id} does not exist.`,
      );

    return gender;
  }
}
