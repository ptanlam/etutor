import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type SessionDocument = Session & mongoose.Document;

@Schema({ versionKey: false })
export class Session {
  @Prop({ maxlength: 50 })
  ownerId!: string;

  @Prop({ maxlength: 50 })
  courseId!: string;

  @Prop({ maxlength: 50 })
  enrollmentId!: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  from!: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  to!: Date;

  @Prop()
  isFinished!: boolean;

  @Prop()
  studentIsAttended!: boolean;

  @Prop()
  notes?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  delayTo?: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
