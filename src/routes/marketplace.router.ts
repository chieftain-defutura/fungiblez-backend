import express from "express";
import {
  createMarketplace,
  deleteMarketplace,
  getAllMarketplaces,
  getMarketplace,
  updateMarketplace,
} from "../controllers/marketplace.controller";

const routes = express.Router();

routes.get("/", getAllMarketplaces);
routes.get("/:id", getMarketplace);
routes.post("/create", createMarketplace);
routes.patch("/:id", updateMarketplace);
routes.delete("/:id", deleteMarketplace);

export default routes;
