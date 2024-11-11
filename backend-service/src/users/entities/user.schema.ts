import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  tg_user_id: Number,
  role: Number,
  firstname: String,
  lastname: String,
});
