"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphqlSchema = void 0;
const type_graphql_1 = require("type-graphql");
const userResolver_1 = require("../resolvers/userResolver");
const commentResolver_1 = require("../resolvers/commentResolver");
const likeResolver_1 = require("./../resolvers/likeResolver");
const movieResolver_1 = require("../resolvers/movieResolver");
const movieRapResolver_1 = require("../resolvers/movieRapResolver");
const rapResolver_1 = require("../resolvers/rapResolver");
const auth_1 = require("../middlewares/auth");
const createGraphqlSchema = async () => {
    return (0, type_graphql_1.buildSchema)({
        resolvers: [
            userResolver_1.UserResolver,
            movieResolver_1.MovieResolver,
            rapResolver_1.RapResolver,
            likeResolver_1.LikeResolver,
            commentResolver_1.CommentResolver,
            movieRapResolver_1.MovieRapResolver,
        ],
        authChecker: async ({ context: { req } }) => {
            const auth = await new auth_1.Authorticator(req.headers.authorization);
            const isCheck = await auth.verifyRole();
            if (isCheck) {
                return true;
            }
            else {
                return false;
            }
        },
    });
};
exports.createGraphqlSchema = createGraphqlSchema;
//# sourceMappingURL=createSchema.js.map