import mongoose from 'mongoose';

export const SignSchema = new mongoose.Schema({
  tg_doctor_id: Number,
  tg_patient_id: Number,
  date: Date,
  messages: Array<String> // change to message model
});
