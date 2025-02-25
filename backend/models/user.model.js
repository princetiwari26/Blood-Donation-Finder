const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bloodType: { type: String },
  age: { type: Number },
  phone: { type: String },
  pincode: { type: String },
  country: { type: String, default: "India" },
  state: { type: String },
  city: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);