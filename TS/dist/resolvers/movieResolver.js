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
exports.MovieResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Movie_1 = require("./../entity/Movie");
let MovieResolver = class MovieResolver {
    async findMovieRap() {
        const connect = (0, typeorm_1.getRepository)(Movie_1.Movie);
        const a = await connect.query("SELECT m.film , m.derciption , r.cinema,r.address FROM movie_cine_rap as mr JOIN movie as m on mr.movieId = m.id JOIN rap as r on mr.rapId = r.id");
        console.log(a[0]);
        return "OK";
    }
    async createMovie(film, derciption) {
        try {
            const movie = new Movie_1.Movie();
            movie.film = film;
            movie.derciption = derciption;
            return Movie_1.Movie.save(movie);
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
], MovieResolver.prototype, "findMovieRap", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Movie_1.Movie),
    __param(0, (0, type_graphql_1.Arg)("film")),
    __param(1, (0, type_graphql_1.Arg)("derciption")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "createMovie", null);
MovieResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MovieResolver);
exports.MovieResolver = MovieResolver;
//# sourceMappingURL=movieResolver.js.map