import { Document } from 'mongoose';
import { Sign } from 'src/sign/entities/sign.entity';

export interface Patient extends Document {
  readonly tg_user_id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly signs: Sign[];
}
