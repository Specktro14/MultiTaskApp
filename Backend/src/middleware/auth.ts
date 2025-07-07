import { GraphQLError } from "graphql";
import type { User } from "../generated/prisma/index.js";
import { verifyToken } from "../auth/jwt.ts";

export const requireAuthn = (user: any) => {
  if (!user || !user.id) {
    throw new GraphQLError("Authentication required", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};

export const requireAuthz = (user: User, element: any) => {
  const isUser =
    element &&
    typeof element === "object" &&
    "id" in element &&
    "email" in element &&
    "role" in element;
  if (isUser) {
    if (user.role !== "admin" && user.id !== element.id) {
      throw new GraphQLError(
        "You do not have permission to perform this action",
        {
          extensions: {
            code: "FORBIDDEN",
          },
        }
      );
    }
  } else {
    if (user.role !== "admin" && user.id !== element.author) {
      throw new GraphQLError(
        "You do not have permission to perform this action",
        {
          extensions: {
            code: "FORBIDDEN",
          },
        }
      );
    }
  }
};

export const throwError = (message: string, code: string) => {
  throw new GraphQLError(message, {
    extensions: {
      code: code,
    },
  });
};

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authentication token is required" });
  }
  try {
    const user = verifyToken(token);
    req.user = user; // Attach user to request object
    next();
  } catch (error: any) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
