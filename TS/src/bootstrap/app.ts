import express, { Express } from 'express';
import http, { Server } from 'http';
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, Context } from "apollo-server-core";

import { createGraphqlSchema } from "./createSchema";
import { User } from "../entity/User";

export class App {
  public readonly PORT: number;
  public readonly app: Express;
  public readonly httpServer: Server;

  constructor() {
    this.app = express()
    this.PORT = Number(process.env.PORT) || 3000;
    this.httpServer = http.createServer(this.app);
    this.bootstrap()
  }

  public async bootstrap(): Promise<void> {
    // Add more middlewares
    // this.app.use()
    await createConnection({
      type: "mysql",
      username: "uusax0bnncjk4sdj",
      password: "VjljBHg0PZLC8WrThBRi",
      database: "bc5pz6ki2gqxmcypsqus",
      host: "bc5pz6ki2gqxmcypsqus-mysql.services.clever-cloud.com",
      port: 3306,
      synchronize: true,
      logging: true,
      entities: [User]
    });
    await this.startGraphql()
  }

  public async startGraphql(): Promise<void> {
    const schema = await createGraphqlSchema()
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }): Context => ({ req, res }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: this.app, cors: true });
  }

  public async start(): Promise<void> {
    this.httpServer.listen(this.PORT);
    console.log(`Server started on http://localhost:${this.PORT}/graphql`);
  }
}
