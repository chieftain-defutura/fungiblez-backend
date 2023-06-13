import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

(async function connectDB() {
  try {
    const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.d6gn7bg.mongodb.net/fungiblez?retryWrites=true&w=majority`;
    const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
})();
