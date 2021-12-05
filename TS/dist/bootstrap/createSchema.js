"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphqlSchema = void 0;
const type_graphql_1 = require("type-graphql");
const userResolver_1 = require("../resolvers/userResolver");
const createGraphqlSchema = async () => {
    return (0, type_graphql_1.buildSchema)({
        resolvers: [userResolver_1.UserResolver],
    });
};
exports.createGraphqlSchema = createGraphqlSchema;
//# sourceMappingURL=createSchema.js.map