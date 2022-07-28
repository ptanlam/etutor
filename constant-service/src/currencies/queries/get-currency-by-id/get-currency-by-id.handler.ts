import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency } from '../../schemas';
import { GetCurrencyById } from './get-currency-by-id';

@CommandHandler(GetCurrencyById)
export class GetCurrencyByIdHandler
  implements ICommandHandler<GetCurrencyById, Currency | null>
{
  constructor(
    @InjectModel(Currency.name) private readonly _currency: Model<Currency>,
  ) {}

  execute(command: GetCurrencyById): Promise<Currency | null> {
    return this._currency.findById(command.id).exec();
  }
}
