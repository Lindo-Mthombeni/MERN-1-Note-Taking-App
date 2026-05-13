export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string; // NoteCard uses note.createdAt, so add this too
}
