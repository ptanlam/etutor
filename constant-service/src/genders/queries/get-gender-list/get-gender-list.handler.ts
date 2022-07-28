import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender } from '../../schemas/gender.schema';
import { GetGenderList } from './get-gender-list';

@CommandHandler(GetGenderList)
export class GetGenderListHandler
  implements ICommandHandler<GetGenderList, Gender[]>
{
  constructor(
    @InjectModel(Gender.name) private readonly _genderModel: Model<Gender>,
  ) {}

  execute(_: GetGenderList): Promise<Gender[]> {
    return this._genderModel.find().exec();
  }
}
