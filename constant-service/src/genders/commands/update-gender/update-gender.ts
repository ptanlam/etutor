import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { AddNewGender } from '../add-new-gender';

export class UpdateGender extends PartialType(AddNewGender) {
  id!: string;
}
