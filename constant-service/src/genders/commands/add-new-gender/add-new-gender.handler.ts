import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender } from '../../schemas';
import { AddNewGender } from './add-new-gender';

@CommandHandler(AddNewGender)
export class AddNewGenderHandler
  implements ICommandHandler<AddNewGender, Gender>
{
  constructor(
    @InjectModel(Gender.name) private readonly _genderModel: Model<Gender>,
  ) {}

  execute(command: AddNewGender): Promise<Gender> {
    const gender = new this._genderModel({
      name: command.name,
    });

    return gender.save();
  }
}
