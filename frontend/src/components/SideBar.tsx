import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { YoutubeIcon } from "@/icons/YoutubeIcon";
import { AiFillTwitterCircle } from "react-icons/ai";
import { ModeToggle } from "./LandingPage/Mode-toggle";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

function SideBar() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Menus: MenuItem[] = [
    { title: "Dashboard", icon: <MdSpaceDashboard />, path: "/dashboard" },
    {
      title: "Twitter",
      icon: <AiFillTwitterCircle />,
      path: "twitter",
    },
    { title: "Youtube", icon: <YoutubeIcon />, path: "youtube" },
    { title: "Ask Ai", icon: <HiOutlineUserGroup />, path: "ask-ai" },
  ];

  return (
    <div
      className={`${
        open ? "w-72 p-5" : "w-20 p-4"
      } bg-sidebar h-screen pt-8 relative duration-300 ease-in-out`}
    >
      {/* Toggle */}
      <div
        className={`absolute cursor-pointer  object-cover -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${
          !open && "rotate-180"
        } transition-all ease-in-out duration-300`}
        onClick={() => setOpen(!open)}
      >
        {open ? <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapse />}
      </div>

      {/* Logo */}
      <div className="flex gap-x-2  items-center">
        <img
          src="https://img.icons8.com/skeuomorphism/32/audio-wave.png"
          alt="logo"
          className={`w-10 h-10 rounded-full object-cover cursor-pointer ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={` origin-left font-semibold font-sans text-2xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          brainWave.
        </h1>
        <span
          className={`ml-4 relative transition-all duration-600 ${
            !open && "hidden"
          } `}
        >
          <ModeToggle />
        </span>
      </div>

      {/* Links */}
      <ul className="pt-6 space-y-0.5">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className={`flex flex-col rounded-md py-3 px-4  transition-all ease-in-out duration-300`}
          >
            <NavLink
              to={menu.path}
              end={menu.title == "Dashboard"} //end propert because we want to make active one item at a time since our routes are like /dashboard , /dashboard/ask-ai etc so dashboard will be always active hence end will tell Navlink that only make active which is /dashboard not /dashboard/...
              className={({ isActive }) =>
                `flex items-center gap-3 font-semibold font-inter min-w-8 hover:bg-primary hover:text-white rounded-md px-2 py-2 ${
                  isActive ? "bg-accent min-w-8 " : ""
                }`
              }
            >
              <span className="text-lg">{menu.icon}</span>
              <span className={`${!open && "hidden"} origin-left duration-300`}>
                {menu.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
