import { Router } from "express";
import { submitApplication } from "../controllers/formController.js";

export const recruitmentRouter = Router();

recruitmentRouter.post("/", submitApplication);
