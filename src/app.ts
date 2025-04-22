import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";

export const app: express.Application = express();
export const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/v1", router);

// error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});
