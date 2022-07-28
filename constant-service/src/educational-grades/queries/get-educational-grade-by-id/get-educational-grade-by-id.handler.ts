import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalGrade } from '../../schemas';
import { GetEducationalGradeById } from './get-educational-grade-by-id';

@CommandHandler(GetEducationalGradeById)
export class GetEducationalGradeByIdHandler
  implements ICommandHandler<GetEducationalGradeById, EducationalGrade | null>
{
  constructor(
    @InjectModel(EducationalGrade.name)
    private readonly _educationalGradeModel: Model<EducationalGrade>,
  ) {}

  execute(command: GetEducationalGradeById): Promise<EducationalGrade | null> {
    const { id } = command;
    return this._educationalGradeModel.findById(id).exec();
  }
}
