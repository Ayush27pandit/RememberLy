import { useState } from "react";
import { ModeToggle } from "./Mode-toggle";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Demo", href: "/demo" },
    { name: "About", href: "/about" },
  ];
  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2
     top-0 z-50 flex h-16 w-11/12 max-w-7xl mt-7 px-2 border-b dark:md:outline shadow-2xl md:rounded-full items-center justify-between md:bg-background/20 md:backdrop-blur-lg ${
       isOpen
         ? "rounded-t-xl bg-[#25222f] "
         : "rounded-full bg-background/20 backdrop-blur-lg dark:outline"
     } `}
    >
      <div className="flex w-full items-center justify-between">
        {/* Brand-Logo */}
        <div className=" flex items-center gap-4 px-4 font-roboto ">
          <a
            href="/"
            className="text-xl font-semibold font-prompt  flex items-center gap-2"
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/skeuomorphism/32/audio-wave.png"
              alt="audio-wave"
            />
            <p className="font-prompt text-lg md:text-2xl">brainWave</p>
          </a>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-4 px-4">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-md hover:text-primary font-prompt transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      {/* Sign In Button and Mode Toggle */}
      <div className="flex items-center gap-4  px-4 ">
        <Button
          className="text-xs md:text-sm px-2 md:px-4 rounded-xl z-10 shadow-lg md:hover:scale-x-103 font-semibold  hover:cursor-pointer dark:text-zinc-100 dark:hover:text-black  font-sans transition-all duration-200 ease-in-out"
          onClick={() => (window.location.href = "/auth")}
        >
          <span className="text-md ">Sign Up</span>
        </Button>

        <span className="block">
          <ModeToggle />
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden   dark:bg-accent hover:bg-secondary p-2 rounded-xl "
        >
          <MenuIcon className="size-6" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-md bg-background dark:bg-[#25222f] backdrop-blur-lg rounded-lg shadow-lg p-4 flex flex-col items-center gap-4 md:hidden">
          <a href="/" className="text-md  hover:text-primary">
            Home
          </a>
          <a href="/" className="text-md  hover:text-primary">
            Demo
          </a>
          <a href="/" className="text-md  hover:text-primary">
            Contact
          </a>

          <a
            href="/"
            className="text-md bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-200"
          >
            Sign-Up
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
