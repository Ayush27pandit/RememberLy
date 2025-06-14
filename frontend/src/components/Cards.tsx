import { TwitterEmbed } from "../embeds/TwitterEmbed";
import { ShareIcon } from "../icons/ShareIcon";
import { OpenIcon } from "../icons/OpenIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContents } from "../hooks/useContent";
import React from "react";

interface CardProps {
  contentId?: string;
  link: string;
  title: string;
  type: "twitter" | "youtube";
  createdAt: string;
}
export const Cards = React.memo(
  ({ contentId, link, title, type }: CardProps) => {
    const { refetch } = useContents();
    const HandleDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      // Logic to handle deletion of the card
      try {
        await axios.delete(`${BACKEND_URL}/api/v1/delete-content`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            contentId,
          },
        });
        console.log("Content deleted successfully");
        refetch();
      } catch (error) {
        console.error("Error deleting content:", error);
      }
    };

    return (
      <div className="bg-white rounded-md shadow-md border-slate-100 border max-w-72 min-w-72 sm:max-w-72  h-auto transition-all duration-100 hover:scale-105">
        <div className="flex justify-between">
          <div className="mx-2 my-1 flex gap-2 items-center">
            <ShareIcon />
            <span className="font-semibold text-xl">{title}</span>
          </div>
          <div className="mx-2 my-1 flex gap-2 items-center">
            <a href={link} target="_blank">
              <OpenIcon />
            </a>
            <span onClick={HandleDelete} className="hover:cursor-pointer">
              <DeleteIcon />
            </span>
          </div>
        </div>
        <div className="m-1 pt-2">
          {type === "youtube" && (
            <iframe
              className="w-full aspect-video rounded-md mt-3"
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && <TwitterEmbed link={link} />}
        </div>
      </div>
    );
  }
);
