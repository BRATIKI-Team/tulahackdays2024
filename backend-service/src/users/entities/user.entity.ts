import { UserType } from '@users/enums/user-type.enum';
import { Document } from 'mongoose';

export interface User extends Document {
  readonly tg_user_id: number;
  readonly role: UserType;
  readonly firstname: string;
  readonly lastname: string;
}
