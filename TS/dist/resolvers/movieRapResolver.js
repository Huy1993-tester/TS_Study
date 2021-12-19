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
const movie_1 = require("../type/movie");
let MovieRapResolver = class MovieRapResolver {
    async findRelations() {
        const repo = await (0, typeorm_1.getConnection)()
            .createQueryBuilder(Movie_1.Movie, "movie")
            .leftJoinAndSelect("movie.rap", "rap")
            .getMany();
        console.log(repo[0].rap);
        return "OK";
    }
    async createMovieRap(rapId, movieId) {
        try {
            const req = await (0, typeorm_1.getConnection)().transaction(async (transactionalEntityManager) => {
                const cine = await Rap_1.Rap.findOne({ id: rapId });
                const movie = await (0, typeorm_1.getConnection)()
                    .createQueryBuilder(Movie_1.Movie, "movie")
                    .select()
                    .where({ id: movieId })
                    .getOne();
                movie.rap = [cine];
                return await transactionalEntityManager.save(movie);
            });
            console.log(req);
            return req;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieRapResolver.prototype, "findRelations", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => movie_1.MovieBody),
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