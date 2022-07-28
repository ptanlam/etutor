import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalLevel } from '../../schemas';
import { GetEducationalLevelByName } from './get-educational-level-by-name';

@CommandHandler(GetEducationalLevelByName)
export class GetEducationalLevelByNameHandler
  implements
    ICommandHandler<GetEducationalLevelByName, EducationalLevel | null>
{
  constructor(
    @InjectModel(EducationalLevel.name)
    private readonly _educationalLevelModel: Model<EducationalLevel>,
  ) {}

  execute(
    command: GetEducationalLevelByName,
  ): Promise<EducationalLevel | null> {
    return this._educationalLevelModel
      .where({ name: command.name })
      .findOne()
      .exec();
  }
}
