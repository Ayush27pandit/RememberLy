import express, { Request, Response, urlencoded } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import zod from "zod";
import dotenv from "dotenv";
import { Content, Link, Users } from "./db";
import bcrypt from "bcrypt";
import { authMiddleware } from "./authMiddleware";
import cors from "cors";

dotenv.config();

const jwt_string = process.env.JWT_SECRET as string;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod
    .string()
    .min(8, "Minimum length of password should be 8 characters"),
});

app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { success, error } = await signupBody.safeParseAsync(req.body);

      if (!success) {
        return res.status(411).json({
          message: "Error in input",
          error: error?.issues[0]?.message,
        });
      }

      const existingUser = await Users.findOne({ username: req.body.username });

      if (existingUser) {
        return res
          .status(403)
          .json({ message: "User already exists with this username" });
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const user = await Users.create({
        username: req.body.username,
        password: hashPassword,
      });

      const userId = user._id;

      const token = jwt.sign({ userId }, jwt_string);

      res.status(200).json({
        message: "Signup successful!",
        token,
      });
    } catch (err) {
      console.error(" Error:", err);
      return res.status(500).json({
        message: " Internal server error",
      });
    }
  }
);

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8, "Length of password minimum 8characters"),
});

app.post(
  "/api/v1/signin",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { success, error } = await signInBody.safeParseAsync(req.body);

      if (!success) {
        return res.status(403).json({
          message: "Error in inputs",
          error: error?.issues[0]?.message,
        });
      }

      const user = await Users.findOne({ username: req.body.username });

      if (!user) {
        return res.status(403).json({
          message: "Please Sign-up first",
        });
      }

      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          jwt_string
        );

        return res.status(200).json({
          message: "User signed-in successful",
          token,
        });
      } else {
        return res.status(403).json({
          message: "Incorrect password",
        });
      }
    } catch (err) {
      console.error(" Error:", err);
      return res.status(500).json({
        message: " Internal server error",
      });
    }
  }
);

app.post(
  "/api/v1/create-content",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { link, type, title, text } = req.body;
      const userId = (req as any).userId;

      if (!link || !type || !title) {
        return res.status(403).json({ message: "Fill all inputs" });
      }

      const content = await Content.create({
        link,
        type,
        title,
        tags: [],
        text,
        userId,
      });

      return res.status(200).json({ message: "Content created", content });
    } catch (error) {
      console.error(" Error creating content:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

app.get(
  "/api/v1/contents",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = (req as any).userId;

      const contents = await Content.find({ userId: userId }).populate(
        "userId"
      );

      return res.status(200).json({
        message: "contents fetched",
        contents,
      });
    } catch (error) {
      console.error(" Error in fetching content:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

app.delete(
  "/api/v1/delete-content",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { contentId } = req.body;

    try {
      console.log(contentId);
      if (!contentId) {
        return res.status(403).json({ message: "Content id is required" });
      }

      const deleteContent = await Content.findByIdAndDelete(contentId);
      if (!deleteContent) {
        return res.status(404).json({ message: "Content not found" });
      }

      return res
        .status(200)
        .json({ message: "Content deleted", deleteContent });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.post(
  "/api/v1/brain/share",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const { share } = req.body;
    const userId = (req as any).userId;

    if (share) {
      const hash = Math.random().toString(36).substring(2, 15);
      const shareableLink = `share/${hash}`;

      await Link.create({
        userId: userId,
        hash: hash,
      });

      return res.status(200).json({
        message: "share link created",
        shareableLink,
      });
    } else {
      //delete link from Link table
      await Link.findOneAndDelete({ userId: userId });
      return res.status(200).json({
        message: "Shareable link deleted",
      });
    }
  }
);

//get Share link

app.get(
  "/api/v1/brain/:shareLink",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const shareableLink = req.params.shareLink;

      const link = await Link.findOne({ hash: shareableLink });

      if (!link) {
        return res.status(404).json({ message: "Invalid Link" });
      }
      const contents = (await Content.find({ userId: link.userId })) || []; //if content being null

      return res.status(200).json({
        message: "Shareable content fetched",
        contents,
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
