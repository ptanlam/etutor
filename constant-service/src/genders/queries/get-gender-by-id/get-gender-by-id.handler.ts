import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender } from '../../schemas';
import { GetGenderById } from './get-gender-by-id';

@CommandHandler(GetGenderById)
export class GetGenderByIdHandler
  implements ICommandHandler<GetGenderById, Gender | null>
{
  constructor(
    @InjectModel(Gender.name) private readonly _genderModel: Model<Gender>,
  ) {}

  execute(command: GetGenderById): Promise<Gender | null> {
    const { id } = command;
    return this._genderModel.findById(id).exec();
  }
}
