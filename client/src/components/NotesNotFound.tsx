import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="absolute inset-[var(--spacing-nav)_0_0_0] flex flex-col items-center z-1">
      <div className="mt-40 flex flex-col items-center gap-4">
        <div className="bg-primary/30 p-7 rounded-full w-fit mb-4">
          <NotebookIcon className="stroke-primary" />
        </div>
        <h2 className="text-3xl font-bold">No notes yet</h2>
        <p>
          Ready to organize your thoughts? Create your first note to get started
        </p>
        <Link to="/create" className="btn btn-primary rounded-full">
          Create Your First Note
        </Link>
      </div>
    </div>
  );
};

export default NotesNotFound;
