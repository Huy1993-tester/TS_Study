import { GraphQLSchema } from "graphql";
import { UserResolver } from "../resolvers/userResolver";
import { buildSchema } from "type-graphql";

export const graphQLSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: [UserResolver],
    validate: false
  });
};
