import express, { NextFunction, Request, Response } from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config({ quiet: true });

const server = express();
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  server.use(cors());
  console.log("Cors Should Work");
}
server.use(express.json()); // this middleware will parse JSON bodies: req.body
server.use(rateLimiter);

// routes
server.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "../client/dist")));

  server.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// server err capture
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${req.method} ${req.url}:`, err.stack);

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
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
