import cors from "cors";
import express from "express";

import "./db";
import * as router from "./routes";

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", router.userRouter);
app.use("/api/v1/marketplace", router.marketplaceRouter);

app.get("/", async (req, res) => {
  res.send("WELCOME TO MARKETPLACE API");
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
