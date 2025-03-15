// import { useState } from "react"; // ✅ Import useState

import "./App.css";
import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Cards } from "./components/Cards";
import { CreateModal } from "./modals/CreateModal";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <>
      <CreateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="my-4 mx-4 py-2 pr-3 flex gap-3 justify-end">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
        />
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 max-w-[900px] ml-0">
        <Cards
          type="youtube"
          link="https://www.youtube.com/watch?v=pb_jYgSqGh0"
          title="Video title"
        />
        <Cards
          type="twitter"
          link="https://x.com/manthanguptaa/status/1900516472926962120"
          title="Twitter title"
        />
        <Cards
          type="youtube"
          link="https://www.youtube.com/watch?v=n5bqjJSJzuo"
          title="Video title2"
        />
      </div>
    </>
  );
}

export default App;
