import { Router } from "express";
import busesRouter from "./buses.routes";
import roleRouter from "./roles.routes";
import {
  checkUserLoggedIn,
  restrictTo,
} from "../middlewares/protect.middleware";
import ERoles from "../enums/ERole";

const appRouter = Router();

appRouter.use("/buses", busesRouter);
appRouter.use(
  "/roles",
  checkUserLoggedIn,
  restrictTo(ERoles.ADMINISTRATOR),
  roleRouter
);

export default appRouter;
