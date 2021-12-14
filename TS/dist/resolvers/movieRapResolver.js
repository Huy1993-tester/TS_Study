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
exports.MovieRapResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Movie_1 = require("./../entity/Movie");
const Rap_1 = require("../entity/Rap");
const User_1 = require("../entity/User");
let MovieRapResolver = class MovieRapResolver {
    async createMovieRap(rapId, movieId) {
        try {
            const connect = (0, typeorm_1.getConnection)();
            const a = await connect.transaction(async (transactionalEntityManager) => {
                const cine = await Rap_1.Rap.findOne({ id: rapId });
                const movie = await Movie_1.Movie.findOne({ id: movieId });
                movie.cine = [cine];
                movie.cine = [cine];
                const user = await new User_1.User();
                user.username = "Huy Dep Trai";
                user.email = "huy@gmail.com";
                user.password = "1234";
                user.role = "CLIENT";
                await transactionalEntityManager.save(movie);
                await transactionalEntityManager.save(user);
                return "OK";
            });
            return a;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("rapId")),
    __param(1, (0, type_graphql_1.Arg)("movieId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MovieRapResolver.prototype, "createMovieRap", null);
MovieRapResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MovieRapResolver);
exports.MovieRapResolver = MovieRapResolver;
//# sourceMappingURL=movieRapResolver.js.map