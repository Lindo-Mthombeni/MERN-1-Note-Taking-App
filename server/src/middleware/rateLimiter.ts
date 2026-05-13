import { log } from "node:console";
import rateLimit from "../config/upstash";
import { RequestHandler } from "express";

const rateLimiter: RequestHandler = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");
    if (!success)
      return res.status(429).json({
        msg: "Too many requests, please try again later",
      });
    next();
  } catch (error) {
    log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
