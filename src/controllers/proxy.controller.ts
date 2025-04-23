import { Request, Response, NextFunction } from "express";

export class ProxyController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { method, url, token, payload } = req.body;

      if (!url || !method) {
        throw new Error("Url and Method are required");
      }

      if (method === "GET") {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: !token ? "none" : `Bearer ${token}`,
          },
        });

        const data = await response.json();

        return res.status(response.status).json({
          success: response.ok,
          status_code: response.status,
          data,
        });
      } else if (method === "POST") {
        if (!payload) {
          throw new Error("Payload is required");
        }

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: !token ? "none" : `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        return res.status(response.status).json({
          success: response.ok,
          status_code: response.status,
          data,
        });
      } else if (method === "PUT") {
        if (!payload) {
          throw new Error("Payload is required");
        }

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: !token ? "none" : `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        return res.status(response.status).json({
          success: response.ok,
          status_code: response.status,
          data,
        });
      } else if (method === "DELETE") {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: !token ? "none" : `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        return res.status(response.status).json({
          success: response.ok,
          status_code: response.status,
          data,
        });
      } else {
        throw new Error("This Http method is not supported.");
      }
    } catch (err) {
      next(err);
    }
  }
}
