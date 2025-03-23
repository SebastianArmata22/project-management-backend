import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserData } from './users.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements UserData {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
  })
  email: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
