import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency } from '../../schemas';
import { UpdateCurrency } from './update-currency';

@CommandHandler(UpdateCurrency)
export class UpdateCurrencyHandler
  implements ICommandHandler<UpdateCurrency, Currency | null>
{
  constructor(
    @InjectModel(Currency.name) private readonly _currency: Model<Currency>,
  ) {}

  async execute({ code, name, id }: UpdateCurrency): Promise<Currency | null> {
    if (
      !!(await this._currency.findOne({ $and: [{ _id: { $ne: id }, code }] }))
    )
      return null;

    let updated = {};
    if (!!name) updated = { ...updated, name };
    if (!!code) updated = { ...updated, code };

    return this._currency.findByIdAndUpdate(id, updated, {
      returnOriginal: false,
    });
  }
}
