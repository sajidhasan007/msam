import { Schema, model } from 'mongoose';
import { ForgetPasswordModel, IForgetPassword } from './auth.interface';

const FacultySchema = new Schema<IForgetPassword, ForgetPasswordModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpSetTime: {
      type: Date,
    },
    isOtpMatch: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// FacultySchema.pre('validate', function (next) {
//   this.otpSetTime = new Date();
//   next();
// });

export const ForgetPassword = model<IForgetPassword, ForgetPasswordModel>(
  'ForgetPasswordHistory',
  FacultySchema
);
