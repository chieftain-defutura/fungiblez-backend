import { Request, Response } from "express";
import Marketplace from "../schema/marketplace.schema";
import User from "../schema/user.schema";

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
    const userAddress = req.body.userAddress.toLowerCase();

    const userAddressData = await User.findOne({
      userAddress: userAddress,
    });
    console.log(userAddressData);
    if (!userAddressData)
      return res
        .status(500)
        .json({ error: { message: "something went wrong" } });

    const userNonce = await User.findOneAndUpdate(
      { userAddress },
      { $inc: { nonce: 1 } },
      { new: true }
    );

    console.log(userNonce);

    const data = await Marketplace.create({ ...req.body });
    console.log(data);
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
