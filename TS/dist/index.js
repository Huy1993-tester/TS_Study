"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const apollo_server_core_1 = require("apollo-server-core");
const User_1 = require("./entity/User");
const userResolver_1 = require("./resolvers/userResolver");
const connectDB = async () => {
    await (0, typeorm_1.createConnection)({
        type: "mysql",
        username: "uusax0bnncjk4sdj",
        password: "VjljBHg0PZLC8WrThBRi",
        database: "bc5pz6ki2gqxmcypsqus",
        host: "bc5pz6ki2gqxmcypsqus-mysql.services.clever-cloud.com",
        port: 3306,
        synchronize: true,
        logging: true,
        entities: [User_1.User],
    });
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({ resolvers: [userResolver_1.UserResolver], validate: false }),
        context: ({ req, res }) => ({ req, res }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`http//:localhost:${PORT}`));
};
exports.connectDB = connectDB;
(0, exports.connectDB)().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map