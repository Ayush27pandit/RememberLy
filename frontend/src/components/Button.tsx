import React, { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
  onClick?: () => void;
}

const variantClasses = {
  primary: "bg-purple-800 text-white",
  secondary: "bg-purple-200 text-purple-800",
};

const defaultClasses =
  "px-4 py-2 rounded-md font-normal flex items-center justify-center gap-1  ";
export function Button({ variant, text, startIcon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick} // ✅ Now handling the onClick event
      className={`${variantClasses[variant]} ${defaultClasses} hover:cursor-pointer hover:font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_#5144e4]`}
    >
      {startIcon}
      {text}
    </button>
  );
}
