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
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../user/entities/user.entity");
let AuthService = class AuthService {
    constructor(jwtService, userRepo) {
        this.jwtService = jwtService;
        this.userRepo = userRepo;
    }
    generateJwtForCreateUser(userId) {
        const accessToken = this.jwtService.sign({ userId });
        return {
            accessToken
        };
    }
    verifyToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            if (error instanceof jwt_1.JsonWebTokenError) {
                throw new common_1.ForbiddenException({
                    message: error.message
                });
            }
            return error;
        }
    }
    generateLoginJwt(user) {
        delete user.password;
        return this.jwtService.sign(Object.assign({}, user));
    }
    async login(email, password) {
        const user = await this.userRepo.findOne({
            where: {
                email
            },
            relations: ['role', 'states']
        });
        if (user) {
            const isMatch = await (0, bcrypt_1.compare)(password, user.password);
            delete user.password;
            if (isMatch) {
                return Object.assign(Object.assign({}, user), { accessToken: this.generateLoginJwt(user) });
            }
            return null;
        }
        return null;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map