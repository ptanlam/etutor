import { PartialType } from '@nestjs/mapped-types';

import { AddNewCurrency } from '../create-new-currency';

export class UpdateCurrency extends PartialType(AddNewCurrency) {
  id!: string;
}
