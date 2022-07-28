import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicRank } from '../../schemas';
import { AddNewAcademicRank } from './add-new-academic-rank';

@CommandHandler(AddNewAcademicRank)
export class AddNewAcademicRankHandler
  implements ICommandHandler<AddNewAcademicRank, AcademicRank>
{
  constructor(
    @InjectModel(AcademicRank.name)
    private readonly _academicRankModel: Model<AcademicRank>,
  ) {}

  execute(command: AddNewAcademicRank): Promise<AcademicRank> {
    const academicRank = new this._academicRankModel({
      name: command.name,
    });
    return academicRank.save();
  }
}
