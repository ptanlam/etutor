import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender } from '../../schemas';
import { DeleteGender } from './delete-gender';

@CommandHandler(DeleteGender)
export class DeleteGenderHandler
  implements ICommandHandler<DeleteGender, Gender | null>
{
  constructor(
    @InjectModel(Gender.name) private readonly _genderModel: Model<Gender>,
  ) {}

  async execute(command: DeleteGender): Promise<Gender | null> {
    const gender = await this._genderModel.findByIdAndDelete(command.id, {
      returnOriginal: false,
    });

    return gender;
  }
}
