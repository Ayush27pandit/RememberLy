import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Cards } from "../components/Cards";
import { CreateModal } from "../modals/CreateModal";
import { useState } from "react";
import { SideBar } from "../components/SideBar";
import { useContents } from "../hooks/useContent";

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contents = useContents();

  return (
    <div className="flex ">
      <div className="rounded-md">
        <SideBar />
      </div>
      <div className="w-full  px-3 bg-gray-200 ">
        <CreateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="my-4 mx-4 py-2 pr-3 flex gap-3 justify-end">
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap ">
          {contents.map(({ type, link, title }) => (
            <Cards link={link} title={title} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}
