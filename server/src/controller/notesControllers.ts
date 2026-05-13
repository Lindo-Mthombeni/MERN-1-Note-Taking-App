import { RequestHandler, Response } from "express";
import Note from "../model/Note";
import { ResponseArgs } from "../types";
import { AppError } from "../utils/AppError";

const jsonData = (success: boolean, msg?: string, data?: any) => {
  if (msg === "" || undefined) return { success, data };
  return { success, msg, data };
};

const finalize = (
  res: Response,
  statusCode: number,
  jsonData: ResponseArgs,
) => {
  res.status(statusCode).json(jsonData);
};

const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const getAllNotes = catchAsync(async (_, res) => {
  const notes = await Note.find().sort({ createdAt: -1 }); // newest first
  if (!notes) throw new AppError("couldn't fetch notes", 404);

  finalize(res, 200, jsonData(true, undefined, notes));
});

export const getNoteById: RequestHandler = catchAsync(async (req, res) => {
  const foundNote = await Note.findById(req.params.id);
  if (!foundNote) throw new AppError("note not found", 404);
  finalize(res, 200, jsonData(true, undefined, foundNote));
});

export const createNote: RequestHandler = catchAsync(async (req, res) => {
  const { title, content } = req.body as { title: string; content: string };
  if (!title && !content)
    throw new AppError("please provide a title and content", 400);
  if (!title) throw new AppError("please provide a title", 400);
  if (!content) throw new AppError("please provide content", 400);

  const savedNote = await Note.create({ title, content });

  finalize(res, 201, jsonData(true, "note created successfully", savedNote));
});

export const updateNote: RequestHandler = catchAsync(async (req, res) => {
  const { title, content } = req.body; // we have access to this because of the middleware server.use(express.json())
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
    },
    { returnDocument: "after" },
  );
  if (!updatedNote) throw new AppError("note not found", 404);

  finalize(res, 200, jsonData(true, "notes updated successfully", updatedNote));
});

export const deleteNote: RequestHandler = catchAsync(async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if (!deletedNote)
    throw new AppError("couldn't delete note, note not found", 404);

  finalize(res, 200, jsonData(true, "note deleted successfully"));
});
