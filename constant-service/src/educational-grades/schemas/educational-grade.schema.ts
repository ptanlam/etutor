import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EducationalGradeDocument = EducationalGrade & mongoose.Document;

@Schema({ versionKey: false })
export class EducationalGrade {
  @Prop({ unique: true, maxlength: 250 })
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  educationalLevelId!: string;
}

export const EducationalGradeSchema =
  SchemaFactory.createForClass(EducationalGrade);

EducationalGradeSchema.set('toJSON', {
  transform: (_, result) => {
    const { _id, ...rest } = result;

    return {
      ...rest,
      id: _id,
    };
  },
});
