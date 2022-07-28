import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenderDocument = Gender & Document;

@Schema({ versionKey: false })
export class Gender {
  @Prop()
  name!: string;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);

GenderSchema.set('toJSON', {
  transform: (_, result) => {
    const { _id, ...rest } = result;

    return {
      ...rest,
      id: _id,
    };
  },
});
