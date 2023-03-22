import express from "express";
import profileRouter from "./profile.routes";
const apiRouter = express.Router();

apiRouter.use("/profile", profileRouter);

export default apiRouter;
