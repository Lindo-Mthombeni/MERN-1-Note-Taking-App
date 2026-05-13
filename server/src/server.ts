import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import { log, error } from "node:console";
import rateLimiter from "./middleware/rateLimiter";

dotenv.config({ quiet: true });

const server = express();

// middleware
server.use(cors());
server.use(express.json()); // this middleware will parse JSON bodies: req.body
server.use(rateLimiter);

// routes
server.get("/", (_, res) => {
  res.send("<a href='/api/notes'>Go Notes</a>");
});
server.use("/api/notes", noteRoutes);

// server err capture
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  error(`[Error] ${req.method} ${req.url}:`, err.stack);

  res.status(statusCode).json({
    success: false,
    msg: message,
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      log(`Server running on port ${PORT}...`);
    });
  } catch (err) {
    error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
