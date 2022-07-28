import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicRank } from '../../schemas';
import { DeleteAcademicRank } from './delete-academic-rank';

@CommandHandler(DeleteAcademicRank)
export class DeleteAcademicRankHandler
  implements ICommandHandler<DeleteAcademicRank, AcademicRank | null>
{
  constructor(
    @InjectModel(AcademicRank.name)
    private readonly _academicRankModel: Model<AcademicRank>,
  ) {}

  async execute(command: DeleteAcademicRank): Promise<AcademicRank | null> {
    const academicRank = await this._academicRankModel.findByIdAndDelete(
      command.id,
      {
        returnOriginal: false,
      },
    );

    return academicRank;
  }
}
