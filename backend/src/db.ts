import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db_url = process.env.DB_URL as string;
mongoose
  .connect(db_url)
  .then(() => {
    console.log("dB connected");
  })
  .catch(() => {
    console.error("error in DB connection");
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//CONTENT
const contentType = ["youtube", "twitter"];
const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentType, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

//TAGS
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

//LINK

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
});

export const Link = mongoose.model("Link", linkSchema);
export const Tags = mongoose.model("Tags", tagSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Users = mongoose.model("Users", userSchema);
