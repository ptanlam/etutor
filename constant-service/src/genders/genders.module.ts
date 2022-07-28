import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AddNewGenderHandler } from './commands/add-new-gender';
import { DeleteGenderHandler } from './commands/delete-gender';
import { UpdateGenderHandler } from './commands/update-gender';
import { GendersController } from './genders.controller';
import { GetGenderByIdHandler } from './queries/get-gender-by-id';
import { GetGenderByNameHandler } from './queries/get-gender-by-name';
import { GetGenderListHandler } from './queries/get-gender-list';
import { Gender, GenderSchema } from './schemas';

const handlers = [
  GetGenderListHandler,
  GetGenderByNameHandler,
  GetGenderByIdHandler,

  AddNewGenderHandler,
  UpdateGenderHandler,
  DeleteGenderHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Gender.name,
        schema: GenderSchema,
      },
    ]),
  ],
  controllers: [GendersController],
  providers: [...handlers],
})
export class GendersModule {}
