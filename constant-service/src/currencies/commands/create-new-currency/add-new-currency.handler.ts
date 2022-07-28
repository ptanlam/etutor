import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency } from '../../schemas';
import { AddNewCurrency } from './add-new-currency';

@CommandHandler(AddNewCurrency)
export class AddNewCurrencyHandler
  implements ICommandHandler<AddNewCurrency, Currency | null>
{
  constructor(
    @InjectModel(Currency.name)
    private readonly _currency: Model<Currency | null>,
  ) {}

  async execute({ code, name }: AddNewCurrency): Promise<Currency | null> {
    if (!!(await this._currency.findOne({ code }))) return null;

    const currency = new this._currency({ name, code });
    return currency.save();
  }
}
