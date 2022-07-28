import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicRank } from '../../schemas';
import { GetAcademicRankList } from './get-academic-rank-list';

@CommandHandler(GetAcademicRankList)
export class GetAcademicRankListHandler
  implements ICommandHandler<GetAcademicRankList, AcademicRank[]>
{
  constructor(
    @InjectModel(AcademicRank.name)
    private readonly _academicRank: Model<AcademicRank>,
  ) {}

  execute(_: GetAcademicRankList): Promise<AcademicRank[]> {
    return this._academicRank.find().exec();
  }
}
