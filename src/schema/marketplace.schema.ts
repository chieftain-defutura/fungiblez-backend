import mongoose from "mongoose";

const marketplaceSchema = new mongoose.Schema(
  {
    userAddress: {
      type: String,
    },
    status: {
      type: String,
      trim: true,
      default: "pending",
      enum: ["pending", "finished", "cancel"],
    },
    tokenId: { type: String },
    collectionAddress: { type: String },
    ask: {
      isOrderAsk: { type: Boolean },
      signer: { type: String },
      collection: { type: String },
      price: { type: Number },
      tokenId: { type: Number },
      amount: { type: Number },
      strategy: { type: String },
      currency: { type: String },
      nonce: { type: Number },
      startTime: { type: Number },
      endTime: { type: Number },
      minPercentageToAsk: { type: Number },
      params: { type: String },
    },
    offers: [
      {
        isOrderAsk: { type: Boolean },
        signer: { type: String },
        collection: { type: String },
        price: { type: Number },
        tokenId: { type: Number },
        amount: { type: Number },
        strategy: { type: String },
        currency: { type: String },
        nonce: { type: String },
        startTime: { type: Number },
        endTime: { type: Number },
        minPercentageToAsk: { type: Number },
        params: { type: String },
        r: { type: String },
        s: { type: String },
        v: { type: String },
      },
    ],
    orderHash: {
      r: { type: String },
      s: { type: String },
      v: { type: String },
    },
  },
  { timestamps: true }
);

const Marketplace = mongoose.model("marketplace", marketplaceSchema);

export default Marketplace;
