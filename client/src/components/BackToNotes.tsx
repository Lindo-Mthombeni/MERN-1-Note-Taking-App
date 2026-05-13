import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

const BackToNotes = () => {
  return (
    <Link to="/" className="flex items-center gap-2 w-fit btn btn-ghost mb-6">
      <ArrowLeftIcon className="size-5" />{" "}
      <span className="font-bold">Back to Notes</span>
    </Link>
  );
};

export default BackToNotes;
