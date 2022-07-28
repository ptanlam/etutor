import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalGrade } from '../../schemas';
import { GetEducationalGradeByName } from './get-education-grade-by-name';

@CommandHandler(GetEducationalGradeByName)
export class GetEducationalGradeByNameHandler
  implements
    ICommandHandler<GetEducationalGradeByName, EducationalGrade | null>
{
  constructor(
    @InjectModel(EducationalGrade.name)
    private readonly _educationalGradeModel: Model<EducationalGrade>,
  ) {}

  execute(
    command: GetEducationalGradeByName,
  ): Promise<EducationalGrade | null> {
    return this._educationalGradeModel
      .where({ name: command.name })
      .findOne()
      .exec();
  }
}
