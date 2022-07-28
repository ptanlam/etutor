import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicRanksController } from './academic-ranks.controller';
import { AddNewAcademicRankHandler } from './commands/add-new-academic-rank';
import { DeleteAcademicRankHandler } from './commands/delete-academic-rank';
import { UpdateAcademicRankHandler } from './commands/update-academic-rank';
import { GetAcademicRankByIdHandler } from './queries/get-academic-rank-by-id';
import { GetAcademicRankByNameHandler } from './queries/get-academic-rank-by-name';
import { GetAcademicRankListHandler } from './queries/get-academic-rank-list';
import { AcademicRank, AcademicRankSchema } from './schemas';

const handlers = [
  GetAcademicRankListHandler,
  GetAcademicRankByNameHandler,
  GetAcademicRankByIdHandler,

  AddNewAcademicRankHandler,
  UpdateAcademicRankHandler,
  DeleteAcademicRankHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeatureAsync([
      {
        name: AcademicRank.name,
        useFactory: () => {
          const schema = AcademicRankSchema;
          schema.set('toJSON', {
            transform: (_, result) => {
              const { _id, ...rest } = result;
              return { ...rest, id: _id };
            },
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AcademicRanksController],
  providers: [...handlers],
})
export class AcademicRanksModule {}
