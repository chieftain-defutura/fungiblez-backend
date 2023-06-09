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
    const tokenId = req.params.tokenId;
    const collectionAddress = req.params.collectionAddress;
    const data = await Marketplace.findOne({ tokenId, collectionAddress });

    if (!data)
      return res.json({
        error: { tokenId, message: "Marketplace is not found with this id" },
      });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const createMarketplace = async (req: Request, res: Response) => {
  try {
    const userAddress = req.body.userAddress.toLowerCase();
    const tokenId = req.body.tokenId;
    const ask = req.body.ask;
    const collectionAddress = req.body.collectionAddress.toLowerCase();
    const userAddressData = await User.findOne({
      userAddress: userAddress,
    });
    console.log(userAddressData);
    if (!userAddressData)
      return res.status(500).json({ error: { message: "something is wrong" } });

    const usernonce = await User.findOneAndUpdate(
      {
        userAddress,
      },
      {
        $inc: { nonce: 1 },
      },
      { new: true }
    );
    console.log(usernonce);

    const marketplaceData = await Marketplace.findOne({
      tokenId: tokenId,
      collectionAddress: collectionAddress,
    });

    if (marketplaceData) {
      const marketplaceUpdate = await Marketplace.findOneAndUpdate(
        { tokenId, collectionAddress },
        {
          $set: {
            ask: ask,
          },
        },
        { new: true }
      );
      return res.json(marketplaceUpdate);
    }

    const data = await Marketplace.create({ ...req.body });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const MakeOffer = async (req: Request, res: Response) => {
  try {
    const userAddress = req.body.userAddress;
    const tokenId = req.body.tokenId;
    const collectionAddress = req.body.collectionAddress.toLowerCase();
    const offers = req.body.offers;
    const signer = req.body.offers.signer;
    console.log(signer);
    const usertoken = await User.findOne({
      userAddress: offers.signer,
    });

    if (usertoken) {
      const usernonce = await User.findOneAndUpdate(
        {
          userAddress,
        },
        {
          $inc: { nonce: 1 },
        },
        { new: true }
      );
      console.log(usernonce);
    }

    const isExisitingToken = await Marketplace.findOne({
      tokenId: tokenId,
      collectionAddress: collectionAddress,
    });

    if (isExisitingToken) {
      const userNonce = await Marketplace.findOneAndUpdate(
        { tokenId, collectionAddress },
        {
          $push: {
            offers: offers,
          },
        },
        { new: true }
      );
      return res.json(userNonce);
    }

    if (!isExisitingToken) {
      const data = await Marketplace.create({
        userAddress: "",
        status: "pending",
        tokenId: tokenId,
        collectionAddress: collectionAddress,
        ask: {},
        offers: [offers],
        orderHash: {},
      });

      return res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const updateMarketplace = async (req: Request, res: Response) => {
  try {
    const tokenId = req.params.tokenId;
    const usertoken = await Marketplace.findOne({
      tokenId,
    });
    if (!usertoken) return;
    const data = await Marketplace.findOneAndUpdate(
      {
        tokenId,
      },
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
