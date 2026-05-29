import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import UserModel from "../model/user.js";
import { isValidEmail, isValidText } from "../util/validation.js";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import {
  NotFoundError,
  ValidationError,
  NotAuthorizedError,
} from "../util/error.js";
import { createJSONToken, isValidPassword } from "../util/auth.js";

const router = express.Router();

type SignupPayload = {
  email: string;
  password: string;
};

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as SignupPayload;

    let errors: { [key: string]: string } = {};

    if (!isValidEmail(email)) {
      errors.email = "Invalid email address.";
    } else {
      const existingUser = await UserModel.findOne({ email }).lean();
      if (existingUser) {
        errors.email = "Email already in use.";
      }
    }

    if (!isValidText(password, 6)) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      return next(
        new ValidationError(
          "User signup failed due to validation errors.",
          errors,
        ),
      );
    }

    try {
      const hashedPassword = await hash(password, 12);
      const newUser = new UserModel({
        id: uuidv4(),
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = createJSONToken(email);

      return res
        .status(201)
        .json({
          message: "User created successfully.",
          user: { id: newUser.id, email: newUser.email },
          token,
        });
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as SignupPayload;

    let user;
    try {
      user = await UserModel.findOne({ email }).lean();
      if (!user) {
        throw new NotFoundError("User not found with email: " + email);
      }
    } catch (error: unknown) {
      return next(new NotAuthorizedError("Authentication failed."));
    }

    const passwordValid = await isValidPassword(password, user.password);
    if (!passwordValid) {
      return next(new NotAuthorizedError("Authentication failed."));
    }

    const token = createJSONToken(email);
    res.json({ token });
  },
);

export default router;
