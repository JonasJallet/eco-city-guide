import { Response } from "express";
import { getDataSource } from "./database";
import { getCache } from "./cache";
import { getUserSessionIdFromCookie } from "./utils/cookie";
import "reflect-metadata";
import User from "./entities/user";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import { PlaceResolver } from "./resolvers/placeResolver";
import { UserResolver } from "./resolvers/userResolver";
import { CategoryResolver } from "./resolvers/categoryResolver";
import { CityResolver } from "./resolvers/cityResolver";
import { formattedValidationError } from "./utils/validation";

export type Context = { res: Response; user: User | null };

const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
  if (!user) return false;
  if (roles.length === 0) return true;
  return roles.includes(user.role);
};

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [PlaceResolver, UserResolver, CategoryResolver, CityResolver],
    validate: true,
    authChecker,
  });
  const server = new ApolloServer({
    schema,
    formatError: formattedValidationError,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { res: res as Response, user };
    },
  });

  await getDataSource();
  await getCache();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
