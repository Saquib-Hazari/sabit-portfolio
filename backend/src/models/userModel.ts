// Creating the user model
import mongoose from "mongoose";

interface Users {
  name: string;
  email: string;
  password: string;
  otpVerify: string;
  otpExpired: number;
  accountVerify: boolean;
  resetOtp: string;
  resetOtpExpired: number;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = new mongoose.Schema<Users>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String, // ✅ Fixed: "type" not "types"
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String, // ✅ Fixed: "type" not "types"
      required: true,
      trim: true,
    },
    otpVerify: {
      type: String,
      default: "",
    },
    otpExpired: {
      type: Number,
      default: 0,
    },
    accountVerify: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpired: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
