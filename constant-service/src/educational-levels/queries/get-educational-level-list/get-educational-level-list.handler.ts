import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalLevel } from '../../schemas';
import { GetEducationalLevelList } from './get-educational-level-list';

@CommandHandler(GetEducationalLevelList)
export class GetEducationalLevelListHandler
  implements ICommandHandler<GetEducationalLevelList, EducationalLevel[]>
{
  constructor(
    @InjectModel(EducationalLevel.name)
    private readonly _educationalLevelModel: Model<EducationalLevel>,
  ) {}

  execute(_: GetEducationalLevelList): Promise<EducationalLevel[]> {
    return this._educationalLevelModel.find().exec();
  }
}
