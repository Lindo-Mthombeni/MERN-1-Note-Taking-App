import mongoose from "mongoose";

// 1st : Create a Schema
// 2nd : Create a model based on that Schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // createdAt || updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
