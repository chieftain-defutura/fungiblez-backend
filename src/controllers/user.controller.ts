import { Request, Response } from "express";
import userSchema from "../schema/user.schema";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await userSchema.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userAddress = req.params.userAddress;
    const data = await userSchema.findById(userAddress);

    if (!data)
      return res.json({
        error: { userAddress, message: "User is not found with this address" },
      });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userAddress = req.body.userAddress.toLowerCase();

    if (!userAddress) return;
    const isExistingUser = await userSchema.findOne({
      userAddress: userAddress,
    });

    if (isExistingUser) return res.json(isExistingUser);

    const data = await userSchema.create({ userAddress });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: "something went wrong" } });
  }
};
