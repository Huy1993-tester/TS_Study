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
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const auth_1 = require("./../middlewares/auth");
const mess_1 = require("../messages/mess");
const user_1 = require("../type/user");
const encoding_1 = require("../middlewares/encoding");
const user_2 = require("./../type/user");
let UserResolver = class UserResolver {
    async findUserAndCommentAndLike(like, userId) {
        const a = await (0, typeorm_1.getConnection)()
            .createQueryBuilder(User_1.User, "user")
            .leftJoinAndSelect("user.like", "like")
            .leftJoinAndSelect("user.comment", "comment")
            .where("like.like=:like", { like })
            .andWhere("user.id =:userId", { userId })
            .getMany();
        console.log(a);
        return "Ok";
    }
    async createUser(createUserBody) {
        const { username, email, password, role } = createUserBody;
        try {
            const repository = (0, typeorm_1.getRepository)(User_1.User);
            const exists = await repository.findOne({ email });
            if (exists)
                throw new Error("User tồn tại");
            else {
                const encoding = await new encoding_1.Encoding(password);
                const hash = await encoding.encoding();
                const newUser = new User_1.User();
                newUser.username = username;
                newUser.email = email;
                newUser.password = hash;
                newUser.role = role;
                return repository.save(newUser);
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createAdmin(createUserBody) {
        const { username, email, password, role } = createUserBody;
        try {
            const repository = (0, typeorm_1.getRepository)(User_1.User);
            const exists = await repository.findOne({ email });
            if (exists)
                throw new Error("User tồn tại");
            else {
                const encoding = await new encoding_1.Encoding(password);
                const hash = await encoding.encoding();
                const newUser = new User_1.User();
                newUser.username = username;
                newUser.email = email;
                newUser.password = hash;
                newUser.role = role;
                return repository.save(newUser);
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async signIn(email, password) {
        try {
            const repository = (0, typeorm_1.getRepository)(User_1.User);
            const findUser = await repository.findOne({ email });
            if (findUser !== undefined) {
                const verifyEncoding = await new encoding_1.VerifyEncoding(password, findUser.password);
                const isCheck = await verifyEncoding.verifyEncoding();
                if (isCheck) {
                    const auth = new auth_1.CreateToken(findUser.email, findUser.id, findUser.role);
                    const token = await auth.token().then((t) => {
                        return t;
                    });
                    console.log(token);
                    return { token };
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
    async updateUser(updateBody) {
        const { id, username, email } = updateBody;
        try {
            const manager = (0, typeorm_1.getManager)();
            const findUser = await manager.findOne(User_1.User, id);
            if (findUser) {
                findUser.username = username;
                findUser.email = email;
                await manager.save(User_1.User, findUser);
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
            const findUser = await (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .select("user")
                .from(User_1.User, "user")
                .where("user.id = :id", { id })
                .getOne();
            if (findUser !== undefined) {
                await (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .delete()
                    .from(User_1.User, "user")
                    .where("user.id = :id", { id })
                    .execute();
                const mess = new mess_1.Messages("User delete successfuly!");
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
    (0, type_graphql_1.Query)(() => String),
    __param(0, (0, type_graphql_1.Arg)("like")),
    __param(1, (0, type_graphql_1.Arg)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findUserAndCommentAndLike", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.CreateUserBody]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.CreateUserBody]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createAdmin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.SignInResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signIn", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_2.UpdateUserBody]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
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