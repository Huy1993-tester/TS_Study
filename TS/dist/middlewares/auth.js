"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorticator = exports.CreateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config/config");
class CreateToken {
    constructor(dataEmail, dataId, dataRole) {
        this.payload = {
            id: dataId,
            email: dataEmail,
            role: dataRole,
        };
        this.secretkey = "abc45365";
        this.expires = {
            expiresIn: config_1.baseConfig.tokenExpire,
        };
    }
    async token() {
        const auth = jwt.sign(this.payload, this.secretkey, this.expires);
        return auth;
    }
}
exports.CreateToken = CreateToken;
class Authorticator {
    constructor(token) {
        this.token = token;
        this.secretkey = "abc45365";
    }
    async responseInfoUser() {
        const user = await jwt.verify(this.token, this.secretkey);
        return user;
    }
    async verifyRole() {
        const info = await this.responseInfoUser();
        const extention = ["ADMIN", "SUPPERADMIN"];
        const isReq = await extention.includes(info.role);
        return isReq;
    }
}
exports.Authorticator = Authorticator;
//# sourceMappingURL=auth.js.map