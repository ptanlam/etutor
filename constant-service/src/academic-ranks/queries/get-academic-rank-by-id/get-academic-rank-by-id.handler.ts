import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicRank } from '../../schemas';
import { GetAcademicRankById } from './get-academic-rank-by-id';

@CommandHandler(GetAcademicRankById)
export class GetAcademicRankByIdHandler
  implements ICommandHandler<GetAcademicRankById, AcademicRank | null>
{
  constructor(
    @InjectModel(AcademicRank.name)
    private readonly _academicRankModel: Model<AcademicRank>,
  ) {}

  execute(command: GetAcademicRankById): Promise<AcademicRank | null> {
    const { id } = command;
    return this._academicRankModel.findById(id).exec();
  }
}
