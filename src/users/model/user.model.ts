import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDoc = User & Document;

@Schema({
  timestamps: {
    createdAt: '_created',
    updatedAt: '_updated',
  },
})
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: 1 })
  rules: 1 | 2 | 3 | 4 | 5;

  @Prop()
  password?: string;

  @Prop()
  gender: "M" | "F" | "O";

  @Prop({ type: Object })
  address: {
    address: string;
    city: string;
    state: string;
    cep: string;
  };

  @Prop({ type: Object })
  contact: {
    phone1: string;
    phone2: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as UserDoc;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
})
