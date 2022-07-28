import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConstantsService } from './constants.service';

@Module({
  imports: [CqrsModule],
  controllers: [ConstantsService],
})
export class ConstantsGrpcModule {}
