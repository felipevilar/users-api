import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDoc = Client & Document;

@Schema({
  timestamps: {
    createdAt: '_created',
    updatedAt: '_updated',
  },
})
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  register: string;

  @Prop({ type: Object })
  address: {
    city: string;
    state: string;
    cep: string;
  };

  @Prop({ type: Object })
  contact: {
    email: string;
    phone1: string;
    phone2: string;
  };
}

export const ClientSchema = SchemaFactory.createForClass(Client);
