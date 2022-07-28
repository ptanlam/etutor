import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AcademicRankDocument = AcademicRank & Document;

@Schema({ versionKey: false })
export class AcademicRank {
  @Prop()
  name!: string;
}

export const AcademicRankSchema = SchemaFactory.createForClass(AcademicRank);
