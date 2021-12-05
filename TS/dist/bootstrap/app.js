"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const createSchema_1 = require("./createSchema");
const User_1 = require("../entity/User");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = Number(process.env.PORT) || 3000;
        this.httpServer = http_1.default.createServer(this.app);
        this.bootstrap();
    }
    async bootstrap() {
        await (0, typeorm_1.createConnection)({
            type: "mysql",
            username: "uusax0bnncjk4sdj",
            password: "VjljBHg0PZLC8WrThBRi",
            database: "bc5pz6ki2gqxmcypsqus",
            host: "bc5pz6ki2gqxmcypsqus-mysql.services.clever-cloud.com",
            port: 3306,
            synchronize: true,
            logging: true,
            entities: [User_1.User]
        });
        await this.startGraphql();
    }
    async startGraphql() {
        const schema = await (0, createSchema_1.createGraphqlSchema)();
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer: this.httpServer })],
        });
        await apolloServer.start();
        apolloServer.applyMiddleware({ app: this.app, cors: true });
    }
    async start() {
        this.httpServer.listen(this.PORT);
        console.log(`Server started on http://localhost:${this.PORT}/graphql`);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map