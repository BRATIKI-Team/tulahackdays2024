import { Document } from 'mongoose';

export interface Sign extends Document {
  readonly tg_doctor_id: number;
  readonly tg_patient_id: number;
  readonly date: Date; // Think about it. Maybe can do it by using enum?
  readonly messages: string[]; // add message model
}
