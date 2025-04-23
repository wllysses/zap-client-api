import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes/routes";

export const app: express.Application = express();
export const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/v1", router);

// @ts-ignore
// error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(404).json({
      success: false,
      name: err.name,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});
