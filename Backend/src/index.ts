import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDefs.ts";
import { resolvers } from "./graphql/resolvers.ts";
import { createContext } from "./graphql/context.ts";
import type { MyContext } from "./graphql/context.ts";
import { expressMiddleware } from "@as-integrations/express5";

async function main() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  //Middlewares
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async (args) => await createContext(args),
    })
  )

  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

main();
