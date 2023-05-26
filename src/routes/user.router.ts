import express from "express";
import {
  getAllUser,
  getUser,
  createUser,
} from "../controllers/user.controller";

const routes = express.Router();

routes.get("/", getAllUser);
routes.get("/:userAddress", getUser);
routes.post("/create", createUser);
export default routes;
