import { Document } from 'mongoose';
import { DoctorSpecializationType } from '../enums/doctor-type.enum';
import { Sign } from 'src/sign/entities/sign.entity';

export interface Doctor extends Document {
  readonly tg_user_id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly specialization: DoctorSpecializationType;
  readonly signs: Sign[];
}
