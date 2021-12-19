import 'dotenv/config';
import { App } from './../src/bootstrap/app';
import supertest from 'supertest';

const app = new App()
const request = supertest(app);
export { app, request };