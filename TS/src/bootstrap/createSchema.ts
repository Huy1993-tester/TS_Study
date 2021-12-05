import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { UserResolver } from '../resolvers/userResolver';

export const createGraphqlSchema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [UserResolver],
  });
};
