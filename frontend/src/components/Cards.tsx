import React, { ReactElement } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  link: string;
  title: string;
  type: "twitter" | "youtube";
}
export const Cards = ({ link, title, type }: CardProps) => {
  return (
    <div className="bg-white rounded-md shadow-md border-slate-100 border max-w-72 min-w-72 sm:max-w-72 min-w-72 h-auto">
      <div className="flex justify-between">
        <div className="mx-2 my-1 flex gap-2 items-center">
          <ShareIcon />
          <span className="font-semibold text-xl">{title}</span>
        </div>
        <div className="mx-2 my-1 flex gap-2 items-center">
          <a href={link} target="_blank">
            <ShareIcon />
          </a>
          <ShareIcon />
        </div>
      </div>
      <div className="m-1 pt-2">
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
