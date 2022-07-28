import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalGrade } from '../../schemas';
import { GetEducationalGradeListForLevel } from './get-educational-grade-list-for-level';

@CommandHandler(GetEducationalGradeListForLevel)
export class GetEducationalGradeListForLevelHandler
  implements
    ICommandHandler<GetEducationalGradeListForLevel, EducationalGrade[]>
{
  constructor(
    @InjectModel(EducationalGrade.name)
    private readonly _educationalGradeModel: Model<EducationalGrade>,
  ) {}

  execute(
    command: GetEducationalGradeListForLevel,
  ): Promise<EducationalGrade[]> {
    return this._educationalGradeModel
      .where({
        educationalLevelId: command.educationalLevelId,
      })
      .find()
      .exec();
  }
}
