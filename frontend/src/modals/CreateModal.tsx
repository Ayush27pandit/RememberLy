import { useState } from "react";
import React from "react";
import { Button } from "../components/Button";
import { CrossIcon } from "../icons/CrossIcon";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const CreateModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("youtube");

  if (!open) return null;

  const HandleSubmit = async () => {
    console.log(title, link);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/create-content`,
        {
          title,
          link,
          type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Added the content", response.data);
      } else {
        console.log("Failed to add the content", response.data);
      }
    } catch (error) {
      console.error(
        "Error during Adding Content",
        error.response?.data || error.message
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg">
        {/* Close Icon */}
        <div className="flex justify-end">
          <button onClick={onClose}>
            <CrossIcon />
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-slate-700 mb-6">
          Add Content
        </h2>

        {/* Input Fields */}
        <div className="flex flex-col gap-5">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <SelectInput value={type} onChange={(e) => setType(e.target.value)} />

          <Button
            onClick={HandleSubmit}
            variant="primary"
            text="Submit"
            startIcon={<></>}
          />
        </div>
      </div>
    </div>
  );
};

function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

function SelectInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option value="youtube">Youtube</option>
      <option value="twitter">Twitter</option>
    </select>
  );
}
