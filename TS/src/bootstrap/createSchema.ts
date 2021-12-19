import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";

import { UserResolver } from "../resolvers/userResolver";
import { CommentResolver } from "../resolvers/commentResolver";
import { LikeResolver } from "./../resolvers/likeResolver";
import { MovieResolver } from "../resolvers/movieResolver";
import { MovieRapResolver } from "../resolvers/movieRapResolver";
import { RapResolver } from "../resolvers/rapResolver";
import { authChecker } from './../middlewares/authChecker';

export const createGraphqlSchema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [
      UserResolver,
      MovieResolver,
      RapResolver,
      LikeResolver,
      CommentResolver,
      MovieRapResolver,
    ],
    authChecker
  });
};
