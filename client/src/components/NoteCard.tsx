import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import type { Note } from "../utils/types";
import { formatDate } from "../utils/formatDate";
import { useContext } from "react";
import { DeleteWindowContext } from "../lib/deleteWindowContext";

const NoteCard = ({ note }: { note: Note }) => {
  const deleteWindow = useContext(DeleteWindowContext);
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    deleteWindow?.setTargetId(id);
    deleteWindow?.setIsOpen(true);
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-card dark:bg-neutral border-t-5 border-info dark:border-secondary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content font-bold">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-3">
            <PenSquareIcon className="size-6" />
            <button
              type="button"
              className="btn btn-ghost btn-sm text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
