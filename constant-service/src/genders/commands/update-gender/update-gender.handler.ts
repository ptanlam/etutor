import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender } from '../../schemas';
import { UpdateGender } from './update-gender';

@CommandHandler(UpdateGender)
export class UpdateGenderHandler
  implements ICommandHandler<UpdateGender, [boolean, Gender | null]>
{
  constructor(
    @InjectModel(Gender.name) private readonly _genderModel: Model<Gender>,
  ) {}

  /**
   *
   *@returns {exist, gender}
   */
  async execute(command: UpdateGender): Promise<[boolean, Gender | null]> {
    let updateClause = {};

    if (!!command.name) {
      const gender = await this._genderModel
        .where({ name: command.name })
        .findOne()
        .exec();

      if (!!gender) return [true, null];

      updateClause = { name: command.name };
    }

    return [
      false,
      await this._genderModel.findByIdAndUpdate(command.id, updateClause, {
        returnOriginal: false,
      }),
    ];
  }
}
