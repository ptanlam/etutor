import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { AddNewCurrencyHandler } from './commands/create-new-currency';
import { DeleteCurrencyHandler } from './commands/delete-currency';
import { UpdateCurrencyHandler } from './commands/update-currency/update-currency.handler';
import { CurrenciesController } from './currencies.controller';
import { GetCurrencyByIdHandler } from './queries/get-currency-by-id';
import { GetCurrencyListHandler } from './queries/get-currency-list';
import { Currency, CurrencySchema } from './schemas';

const handlers = [
  GetCurrencyListHandler,
  GetCurrencyByIdHandler,

  AddNewCurrencyHandler,
  UpdateCurrencyHandler,
  DeleteCurrencyHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Currency.name,
        schema: CurrencySchema,
      },
    ]),
  ],
  controllers: [CurrenciesController],
  providers: [...handlers],
})
export class CurrenciesModule {}
