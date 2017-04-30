import { Document, Schema, model } from "mongoose"

export interface IUser extends Document {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  [key: string]: any
}

export const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String
}, {
  timestamps: true
})

export const User = model<IUser>("User", UserSchema)