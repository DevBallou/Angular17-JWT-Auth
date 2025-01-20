import { NextFunction, Request, Response } from "express";
import UserSchema from "./UserSchema";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

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

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    res.status(400).json({ error: 'Incorrect credentials.' });
  }

  try {

  } catch (error) {

  }
}

const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'me function' });
}

export {
  register,
  login,
  me,
}
