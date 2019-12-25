import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Creating a UserSchema
const UserSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true},
  contactNo: { type: String, required: true}
});

export const User = mongoose.model("User", UserSchema);
