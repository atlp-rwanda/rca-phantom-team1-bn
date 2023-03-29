import { Router } from "express";
import busesRouter from "./buses.routes";
import authRouter from "./auth.routes";
import roleRouter from "./roles.routes";
import {
  checkUserLoggedIn,
  restrictTo,
} from "../middlewares/protect.middleware";
import ERoles from "../enums/ERole";
import { validateLogin } from "../validations/auth.validator";
import { checkUserExists } from "../middlewares/auth.middleware";

const appRouter = Router();

appRouter.use(
  "/roles",
  checkUserLoggedIn,
  restrictTo(ERoles.ADMINISTRATOR),
  roleRouter
);
appRouter.use("/buses", busesRouter);
appRouter.use("/auth", validateLogin, checkUserExists, authRouter);
export default appRouter;
