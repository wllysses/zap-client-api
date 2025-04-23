import { Router } from "express";
import { ProxyController } from "../controllers/proxy.controller";

export const router: Router = Router();

const proxyController = new ProxyController();

// @ts-ignore
router.post("/proxy", proxyController.handle);
