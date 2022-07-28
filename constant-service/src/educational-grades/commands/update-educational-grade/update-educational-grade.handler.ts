import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalGrade } from '../../schemas';
import { UpdateEducationalGrade } from './update-educational-grade';

@CommandHandler(UpdateEducationalGrade)
export class UpdateEducationalGradeHandler
  implements ICommandHandler<UpdateEducationalGrade, EducationalGrade | null>
{
  constructor(
    @InjectModel(EducationalGrade.name)
    private readonly _educationalGradeModel: Model<EducationalGrade>,
  ) {}

  execute(command: UpdateEducationalGrade): Promise<EducationalGrade | null> {
    return this._educationalGradeModel
      .findByIdAndUpdate(
        command.id,
        { name: command.name },
        { returnOriginal: false },
      )
      .exec();
  }
}
