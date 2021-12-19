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
exports.RapResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Rap_1 = require("../entity/Rap");
let RapResolver = class RapResolver {
    async createRap(cinema, address) {
        const rap = new Rap_1.Rap();
        rap.cinema = cinema;
        rap.address = address;
        await Rap_1.Rap.save(rap);
        return rap;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Rap_1.Rap),
    __param(0, (0, type_graphql_1.Arg)("cinema")),
    __param(1, (0, type_graphql_1.Arg)("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RapResolver.prototype, "createRap", null);
RapResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RapResolver);
exports.RapResolver = RapResolver;
//# sourceMappingURL=rapResolver.js.map