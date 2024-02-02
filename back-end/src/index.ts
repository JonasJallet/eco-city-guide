import { DataSource } from "typeorm";
import "reflect-metadata";

import Place from "./entities/place";
// import User from "./entities/user";
// import UserSession from "./entities/userSession";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import { PlaceResolver } from "./resolvers/PlaceResolver";
// import { UserResolver } from "./resolvers/UserResolver";
// import { getUserSessionIdFromCookie } from "./utils/cookie";

// export type Context = { res: Response; user: User | null };

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Place],
  synchronize: true,
});

// const authChecker: AuthChecker<Context> = ({ context }) => {
//   return Boolean(context.user);
// };

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [PlaceResolver],
    validate: true,
    // authChecker,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    //     context: async ({ req, res }): Promise<Context> => {
    //       const userSessionId = getUserSessionIdFromCookie(req);
    //       const user = userSessionId
    //         ? await User.getUserWithSessionId(userSessionId)
    //         : null;
    //       return { res: res as Response, user };
    //     },
  });

  await dataSource.initialize();

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
