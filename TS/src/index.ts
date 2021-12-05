import "reflect-metadata";
// require('dotenv').config();
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer  } from "apollo-server-express";
// import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground, Context } from "apollo-server-core";
import { User } from "./entity/User";
import { UserResolver } from "./resolvers/userResolver";
// import { graphQLSchema } from "./schema/createSchema";
export const connectDB = async () => {
  await createConnection({
    type: "mysql",
    username: "uusax0bnncjk4sdj",
    password: "VjljBHg0PZLC8WrThBRi",
    database: "bc5pz6ki2gqxmcypsqus",
    host: "bc5pz6ki2gqxmcypsqus-mysql.services.clever-cloud.com",
    port: 3306,
    synchronize: true,
    logging: true,
    entities: [User],
  });
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({resolvers: [UserResolver],validate: false}),
    context: ({req,res}):Context => ({req,res}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`http//:localhost:${PORT}`));
};

connectDB().catch((err) => console.log(err));
