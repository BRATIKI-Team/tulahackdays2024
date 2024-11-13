import mongoose from 'mongoose';

export const DoctorSchema = new mongoose.Schema({
  tg_user_id: Number,
  firstname: String,
  lastname: String,
  specialization: Number
});
