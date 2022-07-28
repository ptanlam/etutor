import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddNewCurrency } from './commands/create-new-currency';
import { DeleteCurrency } from './commands/delete-currency';
import { UpdateCurrency } from './commands/update-currency';
import { GetCurrencyById } from './queries/get-currency-by-id';

import { GetCurrencyList } from './queries/get-currency-list';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Get()
  public getList() {
    return this._commandBus.execute(new GetCurrencyList());
  }

  @Post()
  public async addNew(@Body() addNewCurrency: AddNewCurrency) {
    const currency = await this._commandBus.execute(addNewCurrency);
    if (!currency)
      throw new BadRequestException(
        `Currency ${addNewCurrency.code} has already exist.`,
      );

    return currency;
  }

  @Patch(':id')
  public async update(
    @Param() getCurrencyById: GetCurrencyById,
    @Body() updateCurrency: UpdateCurrency,
  ) {
    const currency = await this._commandBus.execute(getCurrencyById);
    if (!currency)
      throw new BadRequestException(`Currency ${currency.id} cannot be found.`);

    updateCurrency.id = getCurrencyById.id;
    const updated = await this._commandBus.execute(updateCurrency);
    if (!updated)
      throw new BadRequestException(
        `Currency ${updateCurrency.code} has already exist.`,
      );

    return updated;
  }

  @Delete(':id')
  public async delete(@Param() deleteCurrency: DeleteCurrency) {
    const currency = await this._commandBus.execute(deleteCurrency);

    if (currency === null)
      throw new BadRequestException(
        `Academic rank with id ${deleteCurrency.id} does not exist.`,
      );

    return currency;
  }
}
