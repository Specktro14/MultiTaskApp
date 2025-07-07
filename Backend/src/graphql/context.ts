import { PrismaClient } from "../generated/prisma/index.js";
import type { User } from "../generated/prisma/index.d.ts";

export interface MyContext {
  user: User;
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

export const createContext = ({ req } : { req : any }): MyContext => {
  return {
    user: req.user || null,
    prisma: prisma,
  }
}