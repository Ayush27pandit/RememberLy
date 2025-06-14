import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { Users } from "./db";

dotenv.config();

const jwt_string = process.env.JWT_SECRET as string;
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  try {
    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, jwt_string) as { userId: string };

    const user = await Users.findById(decode.userId);
    if (!user) {
      return res.status(403).json({
        message: " User does not exist. Please sign up first.",
      });
    }

    //you can also write (req as any) and jwt_string) as {userId:string} or  use types.d.ts and make interface of Request
    (req as any).userId = decode.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "You are not logged In",
    });
  }
};
