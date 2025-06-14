import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface ContentItem {
  _id: string;
  title: string;
  text: string;
  link: string;
  createdAt: number;
  type: string;
}

export function useContents() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContents = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/contents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const cardContents = res.data.contents.sort(
        (a: ContentItem, b: ContentItem) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setContents(cardContents);
    } catch (error) {
      console.log("Fetching content Error", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return {
    contents,
    loading,
    refetch: fetchContents,
  };
}
