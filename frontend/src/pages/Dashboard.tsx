import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateModal } from "../modals/CreateModal";
import { useState } from "react";
import { useContents } from "../hooks/useContent";
import ContentCards from "@/components/NewCard/NewCard";

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refetch } = useContents();

  return (
    <div className="flex ">
      {/* dashboard-content */}
      <div className="container flex-1  px-3 bg-background">
        <CreateModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />

        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 px-4 py-4">
          {/* Search Input */}
          <input
            type="text"
            className="w-full md:w-auto flex-1 px-4 py-2 border rounded-md"
            placeholder="Search Title or Tags"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
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
        </div>

        <ContentCards />
      </div>
    </div>
  );
}
