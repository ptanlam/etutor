import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalLevel } from '../../schemas';
import { DeleteEducationalLevel } from './delete-educational-level';

@CommandHandler(DeleteEducationalLevel)
export class DeleteEducationalLevelHandler
  implements ICommandHandler<DeleteEducationalLevel, EducationalLevel | null>
{
  constructor(
    @InjectModel(EducationalLevel.name)
    private readonly _educationalLevelModel: Model<EducationalLevel>,
  ) {}

  async execute(
    command: DeleteEducationalLevel,
  ): Promise<EducationalLevel | null> {
    const educationalLevel =
      await this._educationalLevelModel.findByIdAndDelete(command.id, {
        returnOriginal: false,
      });

    return educationalLevel;
  }
}
