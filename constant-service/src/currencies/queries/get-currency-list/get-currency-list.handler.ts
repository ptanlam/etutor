import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency } from '../../schemas';
import { GetCurrencyList } from './get-currency-list';

@CommandHandler(GetCurrencyList)
export class GetCurrencyListHandler
  implements ICommandHandler<GetCurrencyList, Currency[]>
{
  constructor(
    @InjectModel(Currency.name) private readonly _currency: Model<Currency>,
  ) {}

  execute(_: GetCurrencyList): Promise<Currency[]> {
    return this._currency.find().exec();
  }
}
