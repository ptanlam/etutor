import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalLevel } from '../../schemas';
import { GetEducationalLevelById } from './get-educational-level-by-id';

@CommandHandler(GetEducationalLevelById)
export class GetEducationalLevelByIdHandler
  implements ICommandHandler<GetEducationalLevelById, EducationalLevel | null>
{
  constructor(
    @InjectModel(EducationalLevel.name)
    private readonly _educationalLevelModel: Model<EducationalLevel>,
  ) {}

  execute(command: GetEducationalLevelById): Promise<EducationalLevel | null> {
    const { id } = command;
    return this._educationalLevelModel.findById(id).exec();
  }
}
