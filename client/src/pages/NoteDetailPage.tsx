import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import BackToNotes from "../components/BackToNotes";
import { Trash2Icon } from "lucide-react";
import type { Note } from "../utils/types";
import {
  DeleteWindowContext,
  DeleteWindowProvider,
} from "../lib/deleteWindowContext";
import DeleteWindow from "../components/Delete";

interface NoteDetailPageContentProps {
  note: Note | null;
  setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

const NoteDetailPageContent = ({
  note,
  setNote,
}: NoteDetailPageContentProps) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.data);
      } catch (error) {
        toast.error("Failed to load note editor");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

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
  const handleSave = async () => {
    if (!note?.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Updated Sucessfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to Update Note");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !note) return <Loader />;

  return (
    <div className="min-h-screen">
      {deleteWindow?.isOpen && <DeleteWindow />}
      <div className="mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <BackToNotes />
            <button
              className="btn btn-error btn-outline rounded-full"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="h-5 w-5" />
              <span>Delete Note</span>
            </button>
          </div>
          <div
            className="my-auto mx-auto card bg-neutral
                        not-dark:bg-card max-w-3xl"
          >
            <div className="card-body">
              <div className="mb-4">
                <label className="label">
                  <span className="label-text mb-4">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input border focus:outline-none focus:ring-1 
                               focus:ring-base-content w-full rounded-full"
                  value={note?.title || ""}
                  onChange={({ target }) => {
                    setNote((prev) => {
                      if (!prev) return prev;
                      return { ...prev, title: target.value };
                    });
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="label">
                  <span className="label-text mb-4">Label</span>
                </label>
                <textarea
                  placeholder="Write Your note here..."
                  className="textarea min-h-32 focus:outline-none rounded-3xl p-4 border
                           focus:ring-1 focus:ring-base-content w-full textarea-ghost bg-base-100
                           border-outline"
                  value={note?.content || ""}
                  onChange={({ target }) => {
                    setNote((prev) => {
                      if (!prev) return prev;
                      return { ...prev, content: target.value };
                    });
                  }}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary rounded-full"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoteDetailPage = () => {
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();
  return (
    <DeleteWindowProvider onDeleteSuccess={() => navigate("/")}>
      <NoteDetailPageContent note={note} setNote={setNote} />
    </DeleteWindowProvider>
  );
};

export default NoteDetailPage;
