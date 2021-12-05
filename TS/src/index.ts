import "reflect-metadata";
import 'dotenv/config';

import { App } from "./bootstrap/app";

const app = new App()
app.start()