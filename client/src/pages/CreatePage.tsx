import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import BackToNotes from "../components/backToNotes";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note Successfully Created");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          toast.error("Too many attepts please try again later", {
            duration: 4000,
          });
        } else {
          toast.error("Failed to create note");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen px-10 py-5">
      <BackToNotes />
      <div className="my-auto mx-auto card bg-neutral not-dark:bg-card max-w-3xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Create New Note</h2>
          <form onSubmit={handleSubmit} className="card-items">
            <div>
              <label className="label mb-2">
                <span className="label-text mr-3">Title</span>
              </label>
              <input
                type="text"
                placeholder="Note Title"
                className="input border focus:outline-none focus:ring-1 
                           focus:ring-base-content w-full rounded-full"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <label className="label mb-2">
                <span className="label-text mr-3">Content</span>
              </label>
              <textarea
                placeholder="Write your notes here..."
                className="textarea min-h-32 focus:outline-none rounded-3xl p-4 border
                           focus:ring-1 focus:ring-base-content w-full textarea-ghost bg-base-100
                           border-outline"
                value={content}
                onChange={({ target }) => setContent(target.value)}
              ></textarea>
            </div>
            <div className="card-actions w-full">
              <button
                type="submit"
                className="btn btn-primary ml-auto rounded-full"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePage;
