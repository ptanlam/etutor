import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalLevel } from '../../schemas';
import { UpdateEducationalLevel } from './update-educational-level';

@CommandHandler(UpdateEducationalLevel)
export class UpdateEducationalLevelHandler
  implements ICommandHandler<UpdateEducationalLevel, EducationalLevel | null>
{
  constructor(
    @InjectModel(EducationalLevel.name)
    private readonly _educationalLevelModel: Model<EducationalLevel>,
  ) {}

  async execute(
    command: UpdateEducationalLevel,
  ): Promise<EducationalLevel | null> {
    return await this._educationalLevelModel.findByIdAndUpdate(
      command.id,
      { name: command.name },
      { returnOriginal: false },
    );
  }
}
