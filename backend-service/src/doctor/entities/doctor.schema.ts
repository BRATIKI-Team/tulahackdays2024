import mongoose from 'mongoose';
import { Sign } from 'src/sign/entities/sign.entity';

export const DoctorSchema = new mongoose.Schema({
  tg_user_id: Number,
  firstname: String,
  lastname: String,
  specialization: Number,
  signs: Array<Sign>
});
