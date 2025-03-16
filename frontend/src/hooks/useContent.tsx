import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContents() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/contents`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setContents(res.data.contents));
    } catch (error) {
      console.log("Fetching content Error", error);
    }
  }, []);
  return contents;
}
