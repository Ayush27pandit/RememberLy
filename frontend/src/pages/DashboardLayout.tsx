import { Outlet } from "react-router-dom";

import SideBar from "@/components/SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex-1 bg-background overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
