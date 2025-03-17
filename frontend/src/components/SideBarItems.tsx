import { ReactElement } from "react";

interface ItemProps {
  text: string;
  itemIcon: ReactElement;
}

export const SideBarItems = ({ text, itemIcon }: ItemProps) => {
  return (
    <div className="flex items-center gap-5 text-lg text-slate-600 hover:bg-slate-300 hover:text-gray-800 cursor-pointer rounded-lg py-3 px-5 transition-all duration-300">
      <span className="text-2xl">{itemIcon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
};
