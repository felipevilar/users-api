import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CallDoc = Call & Document;

@Schema({
  timestamps: {
    createdAt: '_created',
    updatedAt: '_updated',
  },
})
export class Call {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client_id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  technician_id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  responsible_id: string;

  @Prop({ required: true })
  problem_details: string;

  @Prop({ required: true })
  solution_details: string;

  @Prop({ required: true, type: [String] })
  images: string[];

  @Prop({ required: true, default: false })
  closed: boolean;

  @Prop({ type: Object })
  address: {
    address: string;
    city: string;
    state: string;
    cep: string;
  };

  @Prop({ type: Date, required: true })
  date_start: Date;

  @Prop({ type: Date, required: true, default: null })
  date_end: Date;
}

export const CallSchema = SchemaFactory.createForClass(Call);

CallSchema.pre('save', async function (next) {
  next();
});
