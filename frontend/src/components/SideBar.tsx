import { SideBarItems } from "./SideBarItems";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

export const SideBar = () => {
  return (
    <div className="h-screen bg-white border-r border-slate-200  w-60 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 ml-4 pt-6 tracking-wide">
        BrainWave 🧠
      </h1>
      <div className="flex flex-col gap-4">
        <SideBarItems text="Twitter" itemIcon={<TwitterIcon />} />
        <SideBarItems text="YouTube" itemIcon={<YoutubeIcon />} />
      </div>
    </div>
  );
};
