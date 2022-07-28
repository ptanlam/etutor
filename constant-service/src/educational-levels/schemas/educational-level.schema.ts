import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EducationalLevelDocument = EducationalLevel & mongoose.Document;

@Schema({ versionKey: false })
export class EducationalLevel {
  @Prop({ unique: true, maxlength: 250 })
  name!: string;
}

export const EducationalLevelSchema =
  SchemaFactory.createForClass(EducationalLevel);
