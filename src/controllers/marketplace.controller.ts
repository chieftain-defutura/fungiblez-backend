import { Request, Response } from "express";
import Marketplace from "../schema/marketplace.schema";

export const getAllMarketplaces = async (req: Request, res: Response) => {
  try {
    const data = await Marketplace.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const getMarketplace = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Marketplace.findById(id);

    if (!data)
      return res.json({
        error: { id, message: "Marketplace is not found with this id" },
      });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const createMarketplace = async (req: Request, res: Response) => {
  try {
    const data = await Marketplace.create({ ...req.body });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const updateMarketplace = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const data = await Marketplace.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const deleteMarketplace = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await Marketplace.findByIdAndDelete(id);

    res.json({ message: "Marketplace deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};
