"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const encoding_1 = require("./../middlewares/encoding");
const auth_1 = require("./../middlewares/auth");
const mess_1 = require("../messages/mess");
let UserResolver = class UserResolver {
    helloUser() {
        return "Hello All Guys";
    }
    async createUser(username, email, password) {
        try {
            const exists = await User_1.User.findOne({ email });
            if (exists)
                throw new Error("User tồn tại");
            else {
                const encoding = await new encoding_1.Encoding(password);
                const hash = await encoding.encoding();
                const newUser = User_1.User.create({
                    username,
                    email,
                    password: hash,
                });
                return User_1.User.save(newUser);
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async signIn(email, password) {
        try {
            const findUser = await User_1.User.findOne({ where: { email } });
            if (findUser !== undefined) {
                const verifyEncoding = await new encoding_1.VerifyEncoding(password, findUser.password);
                const isCheck = await verifyEncoding.verifyEncoding();
                if (isCheck == true) {
                    const auth = await new auth_1.CreateToken(findUser.email, findUser.id);
                    const token = await auth.token().then((t) => {
                        return t;
                    });
                    return token;
                }
                else {
                    throw new Error("Pass not matching!");
                }
            }
            else {
                throw new Error("Email not matching!");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUser(id, username, email) {
        try {
            const findUser = await User_1.User.findOne({ where: { id } });
            if (findUser !== undefined) {
                findUser.username = username;
                findUser.email = email;
                await User_1.User.save(findUser);
                return findUser;
            }
            else {
                throw new Error("User not exits!");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async removeUser(id) {
        try {
            const findUser = await User_1.User.findOne({ where: { id } });
            if (findUser !== undefined) {
                await User_1.User.remove(findUser);
                const mess = await new mess_1.Messages("User delete successfuly!");
                return mess.showMess();
            }
            else {
                throw new Error("User not exits!");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "helloUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User, { nullable: false }),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __param(2, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String, { nullable: false }),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signIn", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User, { nullable: false }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("username")),
    __param(2, (0, type_graphql_1.Arg)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String, { nullable: false }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removeUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=userResolver.js.map