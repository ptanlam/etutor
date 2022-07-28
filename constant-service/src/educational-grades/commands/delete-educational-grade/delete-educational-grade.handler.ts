import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalGrade } from '../../schemas';
import { DeleteEducationalGrade } from './delete-educational-grade';

@CommandHandler(DeleteEducationalGrade)
export class DeleteEducationalGradeHandler
  implements ICommandHandler<DeleteEducationalGrade, EducationalGrade | null>
{
  constructor(
    @InjectModel(EducationalGrade.name)
    private readonly _educationalGradeModel: Model<EducationalGrade>,
  ) {}

  execute(command: DeleteEducationalGrade): Promise<EducationalGrade | null> {
    return this._educationalGradeModel
      .findByIdAndDelete(command.id, {
        returnOriginal: false,
      })
      .exec();
  }
}
