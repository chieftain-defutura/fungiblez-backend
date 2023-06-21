import express from "express";
import {
  createMarketplace,
  deleteMarketplace,
  getAllMarketplaces,
  getMarketplace,
  updateMarketplace,
  MakeOffer,
} from "../controllers/marketplace.controller";

const routes = express.Router();

routes.get("/", getAllMarketplaces);
routes.get("/:collectionAddress/:tokenId", getMarketplace);
routes.post("/create", createMarketplace);
routes.patch("/:tokenId", updateMarketplace);
routes.post("/makeoffer", MakeOffer);
routes.delete("/:id", deleteMarketplace);

export default routes;
