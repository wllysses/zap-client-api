import { Request, Response, NextFunction } from "express";

export class ProxyController {
  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const { url, token } = req.body;

      if (!url) {
        throw new Error("Url is required");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: !token ? "none" : `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return res.json({
        success: response.ok,
        code: response.status,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async postData(req: Request, res: Response, next: NextFunction) {
    try {
      const { url, token, requestBody } = req.body;

      if (!url) {
        throw new Error("Url is required");
      }

      if (!requestBody) {
        throw new Error("Request body is required");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: !token ? "none" : `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      return res.status(response.status).json({
        success: response.ok,
        code: response.status,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}
