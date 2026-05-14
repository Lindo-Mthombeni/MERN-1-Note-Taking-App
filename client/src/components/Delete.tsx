import { useContext, useState } from "react";
import { DeleteWindowContext } from "../lib/deleteWindowContext";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const DeleteWindow = () => {
  const deleteWindow = useContext(DeleteWindowContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const confirmDelete = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!deleteWindow?.targetId) return;
    setLoading(true);
    try {
      await api.delete(`/notes/${deleteWindow.targetId}`);
      toast.success("Note Deleted");
      deleteWindow.onDeleteSuccess(deleteWindow.targetId);
      deleteWindow.setIsOpen(false);
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  if (!deleteWindow?.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={confirmDelete}
        className="w-full max-w-md rounded-2xl bg-base-100 p-6"
      >
        <h2 className="text-xl font-bold">Delete note</h2>
        <p className="mt-2 text-base-content/70">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => deleteWindow?.setIsOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-error" disabled={loading}>
            {loading ? "Deleting" : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteWindow;
