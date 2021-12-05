"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const typeorm_1 = require("typeorm");
const connectDB = async () => {
    await (0, typeorm_1.createConnection)({
        type: "mysql",
        username: "root",
        password: "password",
        database: "my-connect",
        synchronize: true,
        logging: true,
    });
};
exports.connectDB = connectDB;
//# sourceMappingURL=serverDB.js.map