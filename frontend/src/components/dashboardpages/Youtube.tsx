import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Trash2,
  Youtube,
  Twitter as TwitterIcon,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useContents } from "@/hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface ContentCard {
  _id: string;
  type: "youtube" | "twitter" | "other";
  title: string;
  text: string;
  link: string;
  createdAt: string;
}

function convertToEmbedURL(url: string, type: string): string {
  if (type === "youtube") {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  if (url.includes("twitter.com/") || url.includes("x.com/")) {
    const tweetIdMatch = url.match(/status\/(\d+)/);
    const tweetId = tweetIdMatch?.[1];
    if (tweetId) {
      return `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
    }
  }
  return url;
}

const getContentIcon = (type: string) => {
  switch (type) {
    case "youtube":
      return <Youtube className="h-4 w-4" />;
    case "twitter":
      return <TwitterIcon className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

const getContentColor = (type: string) => {
  switch (type) {
    case "youtube":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "twitter":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export default function YouTube() {
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [loading, setLoading] = useState(true);

  const { contents } = useContents();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCards(contents);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [contents]);

  const handleShare = async (card: ContentCard) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.text,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(
        `${card.title}\n${card.text}\n${window.location.href}`
      );
      alert("Content copied to clipboard!");
    }
  };

  const handleDelete = async (cardId: string) => {
    if (confirm("Are you sure you want to delete this card?")) {
      setCards(cards.filter((card) => card._id !== cardId));

      console.log("frontend contentid ", cardId);
      await axios.delete(`${BACKEND_URL}/api/v1/delete-content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          contentId: cardId,
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-[500px] animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="mt-4 h-48 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl  font-bold font-inter mb-4">
          Youtube Space
        </h1>
        <p className="text-sm md:text-lg text-muted-foreground font-inter">
          Get all your youtube related links in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) =>
          card.type === "youtube" ? (
            <Card
              key={card._id}
              className="sm:h-[300px] md:h-[450px] bg-secondary flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="flex-shrink-0 pb-1">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={`${getContentColor(
                      card.type
                    )} flex items-center gap-1`}
                  >
                    {getContentIcon(card.type)}
                    {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(card)}
                      className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(card._id)}
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-lg font-inter line-clamp-2 ">
                  {card.title}
                </h3>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col px-4 mt-0 pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-shrink-0">
                  {card.text}
                </p>

                <div className="flex-1 min-h-0">
                  <div className="h-full border rounded-lg overflow-hidden bg-gray-200">
                    <iframe
                      src={convertToEmbedURL(card.link, card.type)}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      title={card.title}
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                  </div>
                </div>

                <div className="flex-shrink-0 mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Added on {new Date(card.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : null
        )}
      </div>

      {cards.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Globe className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No content found
          </h3>
          <p className="text-gray-600">
            Start by adding some content to your library.
          </p>
        </div>
      )}
    </div>
  );
}
