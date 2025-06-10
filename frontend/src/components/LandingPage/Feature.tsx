import {
  Infinity as InfinityIcon,
  MessagesSquare,
  Zap,
  ZoomIn,
} from "lucide-react";

const feature = [
  {
    title: "Smart Organization",
    description:
      "Automatically categorizes your saved links by topic, content type, and relevance. No more manual folder management—just intelligent sorting that works.",
    icon: <ZoomIn className="size-6" />,
  },
  {
    title: "Instant Search",
    description:
      "Find any saved content in seconds with AI-powered search. Search by keywords, topics, or even describe what you're looking for in natural language.",
    icon: <Zap className="size-6" />,
  },
  {
    title: "Cross-Platform Sync",
    description:
      "Access your saved links anywhere, anytime. Whether you're on desktop, mobile, or tablet, your digital brain travels with you seamlessly.",
    icon: <MessagesSquare className="size-6" />,
  },
  {
    title: "Never Lose Content",
    description:
      "Built-in backup ensures your saved content is always safe. Even if the original link breaks, we preserve snapshots of your most important saves.",
    icon: <InfinityIcon className="size-6" />,
  },
];

const Feature = () => {
  return (
    <section className="bg-background px-4 md:px-0">
      <div className="container">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <p className="text-sm font-inter text-muted-foreground">
              WHY BRAINWAVE IS DIFFERENT
            </p>
            <h2 className="text-3xl font-inter font-medium md:text-5xl">
              Smart organization that actually understands your content
            </h2>

            <p className="text-muted-foreground font-prompt md:max-w-2xl">
              While other tools just store links, Brainwave analyzes and
              categorizes your saved content automatically. From YouTube videos
              to research articles, everything gets organized by topic, making
              rediscovery effortless.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {feature.map((feature, idx) => (
            <div
              className="flex flex-col justify-between rounded-lg bg-secondary p-6 md:min-h-[150px] md:p-4"
              key={idx}
            >
              <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-lg font-roboto font-medium md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 font-inter text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
