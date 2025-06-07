import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Cards } from "../components/Cards";
import { CreateModal } from "../modals/CreateModal";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import { useContents } from "../hooks/useContent";

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { contents, loading, refetch } = useContents();

  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    // Set a timer for 3 seconds to keep loading animation
    const timer = setTimeout(() => {
      setMinLoading(false);
    }, 3000);

    // Clear timer on unmount
    return () => clearTimeout(timer);
  }, []);

  // Show loading if data is loading or 3 seconds haven't passed yet
  const showLoading = loading || minLoading;

  return (
    <div className="flex ">
      <div className="rounded-md">
        <SideBar />
      </div>
      <div className="w-full  px-3 bg-gray-200 ">
        <CreateModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
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
        {showLoading ? (
          <div className="flex justify-center items-center h-64">
            {/* Loading spinner */}
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap ">
            {contents.map(({ _id, type, link, title }) => (
              <Cards
                key={_id}
                contentId={_id}
                link={link}
                title={title}
                type={type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
