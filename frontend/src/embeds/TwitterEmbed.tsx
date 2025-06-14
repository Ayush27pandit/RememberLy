import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}

export const TwitterEmbed = ({ link }: { link: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window?.twttr?.widgets) {
      window.twttr.widgets.load(ref.current);
    }
  }, [link]);

  return (
    <div
      ref={ref}
      className=" w-full overflow-y-clip flex justify-center"
      style={{ maxWidth: "100%" }}
    >
      <blockquote
        className="twitter-tweet overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: 1,
        }}
      >
        <a href={link.replace("x.com", "twitter.com")} />
      </blockquote>
    </div>
  );
};
