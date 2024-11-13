import { Document } from 'mongoose';
import { DoctorSpecializationType } from '../enums/doctor-type.enum';

export interface Doctor extends Document {
  readonly tg_user_id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly specialization: DoctorSpecializationType;
}
