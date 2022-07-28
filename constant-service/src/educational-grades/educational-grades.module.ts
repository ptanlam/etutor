import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AddNewEducationalGradeHandler } from './commands/add-new-educational-grade';
import { DeleteEducationalGradeHandler } from './commands/delete-educational-grade';
import { UpdateEducationalGradeHandler } from './commands/update-educational-grade';
import { EducationalGradesController } from './educational-grades.controller';
import { GetEducationalGradeByNameHandler } from './queries/get-education-grade-by-name';
import { GetEducationalGradeByIdHandler } from './queries/get-educational-grade-by-id';
import { GetEducationalGradeListForLevelHandler } from './queries/get-educational-grade-list-for-level';
import { EducationalGrade, EducationalGradeSchema } from './schemas';

const handlers = [
  GetEducationalGradeListForLevelHandler,
  GetEducationalGradeByNameHandler,
  GetEducationalGradeByIdHandler,

  AddNewEducationalGradeHandler,
  UpdateEducationalGradeHandler,
  DeleteEducationalGradeHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: EducationalGrade.name,
        schema: EducationalGradeSchema,
      },
    ]),
  ],
  controllers: [EducationalGradesController],
  providers: [...handlers],
})
export class EducationalGradesModule {}
