import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicRank } from '../../schemas';
import { GetAcademicRankByName } from './get-academic-rank-by-name';

@CommandHandler(GetAcademicRankByName)
export class GetAcademicRankByNameHandler
  implements ICommandHandler<GetAcademicRankByName, AcademicRank | null>
{
  constructor(
    @InjectModel(AcademicRank.name)
    private readonly _academicRankModel: Model<AcademicRank>,
  ) {}

  execute(command: GetAcademicRankByName): Promise<AcademicRank | null> {
    return this._academicRankModel
      .where({
        name: command.name,
      })
      .findOne()
      .exec();
  }
}
