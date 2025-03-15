import { Button } from "../components/Button";
import { CrossIcon } from "../icons/CrossIcon";
export const CreateModal = ({ open, onClose }) => {
  return (
    <div>
      {open && (
        <div className="w-screen  h-screen fixed top-0 left-0   backdrop-blur-sm flex justify-center items-center">
          <div className="bg-slate-300  opacity-100  rounded-lg ">
            <div className="flex flex-col gap-4 p-4">
              <div onClick={onClose} className="flex justify-end">
                <CrossIcon />
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <Input placeholder="Title" />
                <Input placeholder="Link" />
              </div>
              <Button variant="primary" text="Submit"></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Input({ onChange, placeholder }: { onChange: () => void }) {
  return (
    <div>
      <input
        type="text "
        placeholder={placeholder}
        className="px-4 py-2 font-semibold border rounded"
        onChange={onChange}
      />
    </div>
  );
}
