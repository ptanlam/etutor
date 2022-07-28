import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AddNewEducationalLevelHandler } from './commands/add-new-educational-level';
import { DeleteEducationalLevelHandler } from './commands/delete-educational-level';
import { UpdateEducationalLevelHandler } from './commands/update-educational-level';
import { EducationalLevelsController } from './educational-levels.controller';
import { GetEducationalLevelByIdHandler } from './queries/get-educational-level-by-id';
import { GetEducationalLevelByNameHandler } from './queries/get-educational-level-by-name';
import { GetEducationalLevelListHandler } from './queries/get-educational-level-list';
import { EducationalLevel, EducationalLevelSchema } from './schemas';

const handlers = [
  GetEducationalLevelByIdHandler,
  GetEducationalLevelByNameHandler,
  GetEducationalLevelListHandler,

  AddNewEducationalLevelHandler,
  UpdateEducationalLevelHandler,
  DeleteEducationalLevelHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeatureAsync([
      {
        name: EducationalLevel.name,
        useFactory: () => {
          const schema = EducationalLevelSchema;
          schema.set('toJSON', {
            transform: (_, result) => {
              const { _id, ...rest } = result;
              return { ...rest, id: _id };
            },
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [EducationalLevelsController],
  providers: [...handlers],
})
export class EducationalLevelsModule {}
