import { Router } from "express";
import { magicNum } from "../controllers/testController";

const router = Router();

router.get("/", magicNum);

export default router;
