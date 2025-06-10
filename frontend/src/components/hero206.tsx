"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus,
  RotateCw,
  Share,
} from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Hero206 = () => {
  return (
    <section className="bg-background">
      <div className="relative container py-32">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-anton text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            Shadcn Blocks <br /> Just Copy/Paste.
          </h1>
          <p className="my-7 max-w-3xl tracking-tight text-muted-foreground md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipiasicing elit.Lorem ipsum
            dolor sit amet consectetur Lorem
          </p>
        </header>

        <Badge
          variant="outline"
          className="mx-auto mt-10 flex w-fit cursor-pointer items-center justify-center rounded-full border py-1 pr-3 pl-2 font-normal transition-all ease-in-out hover:gap-3"
        >
          <Avatar className="relative -mr-5 overflow-hidden rounded-full border md:size-10">
            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" alt="" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar className="relative -mr-5 overflow-hidden rounded-full border md:size-10">
            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-5.webp" alt="" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar className="relative -mr-5 overflow-hidden rounded-full border md:size-10">
            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-6.webp" alt="" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <p className="ml-6 tracking-tight capitalize md:text-lg">
            {" "}
            Trusted by <span className="font-bold text-foreground">
              10k+
            </span>{" "}
            users.
          </p>
        </Badge>

        <div className="relative mt-12 flex h-full w-full flex-col items-center justify-center">
          <BrowserMockup
            className="w-full"
            url="https://shadcnblocks.com/block/hero206"
            DahboardUrlDesktop="https://shadcnblocks.com/images/block/dashboard/dashboard-1.png"
            DahboardUrlMobile="https://shadcnblocks.com/images/block/dashboard/dashboard-mobile-1.png"
          />
          <div className="absolute bottom-0 h-2/3 w-full bg-linear-to-t from-white to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { Hero206 };

const BrowserMockup = ({
  className = "",
  url = "https://shadcnblocks.com/block/hero206",
  DahboardUrlDesktop = "https://shadcnblocks.com/images/block/dashboard/dashboard-1.png",
  DahboardUrlMobile = "https://shadcnblocks.com/images/block/dashboard/dashboard-mobile-1.png",
}) => (
  <div
    className={cn(
      "relative w-full overflow-hidden rounded-4xl border",
      className,
    )}
  >
    <div className="flex items-center justify-between gap-10 bg-muted px-8 py-4 lg:gap-25">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
        <div className="ml-6 hidden items-center gap-2 opacity-40 lg:flex">
          <ChevronLeft className="size-5" />
          <ChevronRight className="size-5" />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="relative hidden w-full rounded-full bg-white px-4 py-1 text-center text-sm tracking-tight md:block">
          {url}
          <RotateCw className="absolute top-2 right-3 size-3.5" />
        </p>
      </div>

      <div className="flex items-center gap-4 opacity-40">
        <Share className="size-4" />
        <Plus className="size-4" />
        <Copy className="size-4" />
      </div>
    </div>

    <div className="relative w-full">
      <img
        src={DahboardUrlDesktop}
        alt=""
        className="object-cove hidden aspect-video h-full w-full object-top md:block"
      />
      <img
        src={DahboardUrlMobile}
        alt=""
        className="block h-full w-full object-cover md:hidden"
      />
    </div>
    <div className="absolute bottom-0 z-10 flex w-full items-center justify-center bg-muted py-3 md:hidden">
      <p className="relative flex items-center gap-2 rounded-full px-8 py-1 text-center text-sm tracking-tight">
        {url}
      </p>
    </div>
  </div>
);
