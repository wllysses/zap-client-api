import { Router } from "express";
import { ProxyController } from "./controllers/proxy.controller";

export const router: Router = Router();

// router.post("/get-request", new ProxyController().getDataWithoutToken);
// router.post("/get-request-token", new ProxyController().getDataWithToken);

router.post("/get-request", new ProxyController().getData);
router.post("/post-request", new ProxyController().postData);
