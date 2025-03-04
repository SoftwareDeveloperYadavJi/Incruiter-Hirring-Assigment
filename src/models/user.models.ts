import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// Define the User interface with TypeScript
export interface User {
  name: string;
  email: string;
  password: string;
  otp?: string | null;
  role: "admin" | "user";
  passwordResetToken?: string | null;
}


// Define the User Schema with best practices
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, 
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    otp: {
      type: String,
      default: null, // Can be null
    },
    passwordResetToken: {
      type: String,
      default: null, // Can be null
    },
  },
  {
    timestamps: true, 
 
  }
);





// Export the User Model
export const UserModel = model<User>("User", UserSchema);
