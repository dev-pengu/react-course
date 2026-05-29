import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { NotAuthorizedError } from "./error.js";

const KEY = "supersecret";

const createJSONToken = (email: string) => {
  return jwt.sign({ email }, KEY, { expiresIn: "1h" });
};

const validateJSONToken = (token: string) => {
  return jwt.verify(token, KEY) as { email: string };
};

const isValidPassword = (password: string, hashedPassword: string) => {
  return compare(password, hashedPassword);
};

const checkAuthMiddleware = (req: any, res: any, next: any) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthorizedError("Not authenticated."));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER MALFORMED.");
    return next(new NotAuthorizedError("Not authenticated."));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error: unknown) {
    console.log("NOT AUTH. TOKEN INVALID.", error);
    return next(new NotAuthorizedError("Not authenticated."));
  }
  next();
};

export {
  createJSONToken,
  validateJSONToken,
  isValidPassword,
  checkAuthMiddleware,
};
