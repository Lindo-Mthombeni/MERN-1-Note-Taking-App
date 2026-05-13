import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

const backToNotes = () => {
  return (
    <Link to="/">
      <button className="btn btn-ghost">
        <ArrowLeftIcon className="size-4" />
        Back To Notes
      </button>
    </Link>
  );
};

export default backToNotes;
