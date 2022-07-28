import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicRank } from '../../schemas';
import { UpdateAcademicRank } from './update-academic-rank';

@CommandHandler(UpdateAcademicRank)
export class UpdateAcademicRankHandler
  implements
    ICommandHandler<UpdateAcademicRank, [boolean, AcademicRank | null]>
{
  constructor(
    @InjectModel(AcademicRank.name)
    private readonly _academicRankModel: Model<AcademicRank>,
  ) {}

  /**
   *
   * @returns {exist, academic-rank}
   */
  async execute(
    command: UpdateAcademicRank,
  ): Promise<[boolean, AcademicRank | null]> {
    let updateClause = {};

    if (!!command.name) {
      const academicRank = await this._academicRankModel
        .find({
          name: command.name,
        })
        .findOne()
        .exec();
      if (academicRank) return [true, null];

      updateClause = { name: command.name };
    }

    return [
      false,
      await this._academicRankModel.findByIdAndUpdate(
        command.id,
        updateClause,
        { returnOriginal: false },
      ),
    ];
  }
}
