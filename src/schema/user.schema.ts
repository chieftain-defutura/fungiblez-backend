import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userAddress: { type: String, lowercase: true, unique: true },
    nonce: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
