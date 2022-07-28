import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Currency {
  @Prop({ unique: true, index: true })
  code!: string;

  @Prop()
  name!: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);

CurrencySchema.set('toJSON', {
  transform: (_, result) => {
    const { _id, ...rest } = result;

    return {
      ...rest,
      id: _id,
    };
  },
});
