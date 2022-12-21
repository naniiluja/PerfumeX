import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    customId: {type: String},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    warningCount: {type: Number, default: 0},
    isLocked: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;