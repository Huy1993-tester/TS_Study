"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLSchema = void 0;
const userResolver_1 = require("../resolvers/userResolver");
const type_graphql_1 = require("type-graphql");
const graphQLSchema = async () => {
    return await (0, type_graphql_1.buildSchema)({
        resolvers: [userResolver_1.UserResolver],
        validate: false
    });
};
exports.graphQLSchema = graphQLSchema;
//# sourceMappingURL=createSchema.js.map