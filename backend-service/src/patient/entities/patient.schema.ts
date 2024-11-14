import mongoose from 'mongoose';
import { Sign } from 'src/sign/entities/sign.entity';

export const PatientSchema = new mongoose.Schema({
  tg_user_id: Number,
  firstname: String,
  lastname: String,
  signs: Array<Sign>
});
