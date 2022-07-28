import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  versionKey: false,
})
export class Feedback {
  @Prop()
  content!: string;

  @Prop()
  ownerId!: string;

  @Prop()
  topicId!: string;

  @Prop({ default: null })
  updatedAt?: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
