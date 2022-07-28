import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency } from '../../schemas';
import { DeleteCurrency } from './delete-currency';

@CommandHandler(DeleteCurrency)
export class DeleteCurrencyHandler
  implements ICommandHandler<DeleteCurrency, Currency | null>
{
  constructor(
    @InjectModel(Currency.name) private readonly _currency: Model<Currency>,
  ) {}

  async execute(command: DeleteCurrency): Promise<Currency | null> {
    const currency = await this._currency.findByIdAndDelete(command.id, {
      returnOriginal: false,
    });

    return currency;
  }
}
