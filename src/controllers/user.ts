import UserModel from "../db/users";
import express from "express";
import { generateToken } from "../helpers/index";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;
    const { createUser,getUserByEmail, getUserByPassword } = UserModel;

    if (!username || !password || !email) {
      return res.sendStatus(404);
    }
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) return res.sendStatus(400);

    const user = await createUser({
      username,
      email,
      password,
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { getUserByEmail, getUserByPassword } = UserModel;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.sendStatus(404);
    }

    const isPasswordValid = await getUserByPassword(password);
    if (!isPasswordValid) {
      return res.sendStatus(401);
    }

    const token = generateToken(email);
    return res.status(200).json({ token }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
