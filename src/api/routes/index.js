import { Router } from "express";
import busesRouter from "./buses.routes";
import authRouter from "./auth.routes";
import roleRouter from "./roles.routes";
import profileRouter from "./profile.routes";
import signupRouter from "./signup.routes";
import {
  checkUserLoggedIn,
  restrictTo,
} from "../middlewares/protect.middleware";
import ERoles from "../enums/ERole";
import { userExistsByEmail } from "../middlewares/user.middleware";
import { validateSignupPayload } from "../validations/user.validator";
import { validateLogin } from "../validations/auth.validator";
import { checkUserExists } from "../middlewares/auth.middleware";

const appRouter = Router();

appRouter.use("/buses", busesRouter);
appRouter.use(
  "/roles",
  checkUserLoggedIn,
  restrictTo(ERoles.ADMINISTRATOR),
  roleRouter
);
appRouter.use(
  "/signup",
  checkUserLoggedIn,
  restrictTo(ERoles.ADMINISTRATOR),
  validateSignupPayload,
  userExistsByEmail,
  signupRouter
);
appRouter.use("/auth", validateLogin, checkUserExists, authRouter);
appRouter.use(profileRouter);

export default appRouter;
