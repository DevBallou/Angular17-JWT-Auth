import { NextFunction, Request, Response } from "express";
import UserSchema from "./UserSchema";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "All fields are required" });
  }

  const user = await UserSchema.findOne({ email });
  if (user) {
    res.status(400).json({ error: 'User Aleardy exists.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: true,
      message: 'User created',
      data: { _id: newUser._id, email: newUser.email },
    })

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    res.status(400).json({ error: 'User not found.' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user!.password);
  if (!isPasswordMatch) {
    res.status(400).json({ error: 'Incorrect credentials.' });
  }

  try {
    const token = sign({ sub: user!._id }, config.jwtSecret as string, {
      expiresIn: '1d',
    });

    res.status(200).json({
      status: true,
      message: 'User logged in',
      data: { _id: user!._id, email: user!.email, name: user!.name },
      token,
    })
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

const me = async (req: Request, res: Response, next: NextFunction) => {
  const _request = req as AuthRequest;
  const user = await UserSchema.findById(_request.userId);
  try {
    if (user) {
      res.status(200).json({
        status: true,
        data: { _id: user._id, email: user.email, name: user.name },
      });
    }

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }

};

export {
  register,
  login,
  me,
}
