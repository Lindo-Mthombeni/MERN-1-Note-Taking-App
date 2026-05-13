import { ZapIcon } from "lucide-react";

const RateLimitComp = () => {
  return (
    <div className="mx-auto max-w-100 p-2">
      <div
        className="bg-primary/10 border border-primary/80 dark:border-primary/40 w-full mt-3
                 rounded-3xl p-4 flex items-center gap-5"
      >
        <div className="bg-primary/30 p-3 rounded-full">
          <ZapIcon className="stroke-primary" />
        </div>

        <div>
          <h3 className="font-bold">Rate Limit Reached</h3>
          <p className="text-base-content">Too many requests</p>

          <p className="text-sm text-base-content/65">
            Try again in a few seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitComp;
