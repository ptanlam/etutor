import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalGrade } from '../../schemas';
import { AddNewEducationalGrade } from './add-new-educational-grade';

@CommandHandler(AddNewEducationalGrade)
export class AddNewEducationalGradeHandler
  implements ICommandHandler<AddNewEducationalGrade, EducationalGrade | null>
{
  constructor(
    @InjectModel(EducationalGrade.name)
    private readonly _educationGradeModel: Model<EducationalGrade>,
  ) {}

  execute(command: AddNewEducationalGrade): Promise<EducationalGrade | null> {
    const educationalGrade = new this._educationGradeModel({
      name: command.name,
      educationalLevelId: command.educationalLevelId,
    });

    return educationalGrade.save();
  }
}
