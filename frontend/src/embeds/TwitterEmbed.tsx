import { useEffect } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}

export const TwitterEmbed = ({ link }: { link: string }) => {
  useEffect(() => {
    window.twttr?.widgets?.load();
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <a href={link.replace("x.com", "twitter.com")}></a>
    </blockquote>
  );
};
