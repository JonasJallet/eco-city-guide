import { Response } from "express";
import { getDataSource } from "./database";
import "reflect-metadata";
import User from "./entities/user";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import { PlaceResolver } from "./resolvers/placeResolver";
import { UserResolver } from "./resolvers/userResolver";
import { CategoryResolver } from "./resolvers/categoryResolver";
import { getUserSessionIdFromCookie } from "./utils/cookie";
import { CityResolver } from "./resolvers/cityResolver";

export type Context = { res: Response; user: User | null };

const authChecker: AuthChecker<Context> = ({ context }) => {
  console.log("AuthChecker - User:", context.user); // Ajoutez ceci pour vérifier l'utilisateur dans l'authChecker
  return Boolean(context.user);
};

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [PlaceResolver, UserResolver, CategoryResolver, CityResolver],
    validate: true,
    authChecker,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      console.log("User Session ID:", userSessionId);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      console.log("Authenticated User:", user);
      return { res: res as Response, user };
    },
  });

  await getDataSource();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
