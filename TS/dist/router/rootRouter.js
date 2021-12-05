"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const resolvers_1 = require("./resolvers");
exports.rootRouter = (0, express_1.default)();
exports.rootRouter.use("/", resolvers_1.resolvers);
//# sourceMappingURL=rootRouter.js.map