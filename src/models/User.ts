import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "E-mail jest wymagany"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Hasło jest wymagane"],
  },
  name: {
    type: String,
    required: [true, "Imię jest wymagane"],
  },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
