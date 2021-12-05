"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEncoding = exports.Encoding = void 0;
const argon2_1 = __importDefault(require("argon2"));
class Encoding {
    constructor(pass) {
        this.password = pass;
    }
    encoding() {
        return argon2_1.default.hash(this.password);
    }
}
exports.Encoding = Encoding;
class VerifyEncoding {
    constructor(pass, userPass) {
        this.password = pass;
        this.userPassword = userPass;
    }
    verifyEncoding() {
        return argon2_1.default.verify(this.userPassword, this.password);
    }
}
exports.VerifyEncoding = VerifyEncoding;
//# sourceMappingURL=encoding.js.map