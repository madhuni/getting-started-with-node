'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a UserSchema
const UserSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true},
  contactNo: { type: String, required: true}
});

// Exposing the Mongoose Model with name 'User' of type 'UserSchema'
module.exports = mongoose.model('User', UserSchema);