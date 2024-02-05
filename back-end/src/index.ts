import "reflect-metadata";
// import User from "./entities/user";
// import UserSession from "./entities/userSession";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import DataSource from "./data-source";
import { PlaceResolver } from "./resolvers/placeResolver";
import { PlaceFactory } from "./factory/placeFactory";
import Place from "./entities/place";
// import { UserResolver } from "./resolvers/UserResolver";
// import { getUserSessionIdFromCookie } from "./utils/cookie";

// export type Context = { res: Response; user: User | null };

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

  await DataSource.initialize();
  const entities = DataSource.entityMetadatas;

  for (const entity of entities) {
    const repository = DataSource.getRepository(entity.name);
    await repository.clear(); 
  }
  
  const placeRepository = DataSource.getRepository(Place);
  const placeData = await new PlaceFactory().createMany(10);
  await placeRepository.save(placeData);

  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
