import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalLevel } from '../../schemas';
import { AddNewEducationalLevel } from './add-new-educational-level';

@CommandHandler(AddNewEducationalLevel)
export class AddNewEducationalLevelHandler
  implements ICommandHandler<AddNewEducationalLevel, EducationalLevel>
{
  constructor(
    @InjectModel(EducationalLevel.name)
    private readonly _educationalLevelModel: Model<EducationalLevel>,
  ) {}

  execute(command: AddNewEducationalLevel): Promise<EducationalLevel> {
    const educationalLevel = new this._educationalLevelModel({
      name: command.name,
    });

    return educationalLevel.save();
  }
}
