import { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import RateLimitComp from "../components/RateLimitComp";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import type { Note } from "../utils/types";
import Loader from "../components/Loader";
import api from "../lib/axios";
import {
  DeleteWindowContext,
  DeleteWindowProvider,
} from "../lib/deleteWindowContext";
import DeleteWindow from "../components/Delete";
import NotesNotFound from "../components/NotesNotFound";

interface HomePageContentProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const HomePageContent = ({ notes, setNotes }: HomePageContentProps) => {
  const deleteWindow = useContext(DeleteWindowContext);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.data);
        setIsRateLimited(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [setNotes]);

  return (
    <div className="min-h-screen relative">
      {deleteWindow?.isOpen && <DeleteWindow />}
      <NavBar />
      {isRateLimited && <RateLimitComp />}

      {loading && (
        <div className="w-full p-10">
          <Loader />
        </div>
      )}

      {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

      {notes.length > 0 && !isRateLimited && (
        <div className="w-full flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 w-full max-w-7xl mt-10">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const deleteNoteFromUI = (id: string) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  return (
    <DeleteWindowProvider onDeleteSuccess={deleteNoteFromUI}>
      <HomePageContent notes={notes} setNotes={setNotes} />
    </DeleteWindowProvider>
  );
};

export default HomePage;
