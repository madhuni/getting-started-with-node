/**
 * From the mongoose docs: Models are fancy constructors
 * compiled from Schema definitions. An instance of a model
 * is called a document. Models are responsible for creating
 * and reading documents from the underlying MongoDB database.
 */

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
