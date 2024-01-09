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
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const auth_service_1 = require("../../auth/services/auth.service");
const zone_service_1 = require("../../location/services/zone.service");
const mailer_service_1 = require("../../mailer/services/mailer.service");
const user_entity_1 = require("../entities/user.entity");
let UserService = class UserService {
    constructor(userRepo, mailerService, zoneService, roleService, authService) {
        this.userRepo = userRepo;
        this.mailerService = mailerService;
        this.zoneService = zoneService;
        this.roleService = roleService;
        this.authService = authService;
    }
    async create(data) {
        const states = await this.zoneService.getStatesById(data.states);
        const role = await this.roleService.getRoleById(data.roleId);
        const user = Object.assign(Object.assign({}, data), { states,
            role });
        const newUser = this.userRepo.create(user);
        const createdUser = await this.userRepo.save(newUser);
        const token = this.authService.generateJwtForCreateUser(createdUser.id);
        await this.mailerService.sendMailForCreateUser(createdUser.email, token.accessToken);
        return createdUser;
    }
    async setPassword(data, userId) {
        const user = await this.userRepo.findOne({
            where: {
                password: (0, typeorm_2.IsNull)(),
                id: userId
            }
        });
        if (!user) {
            throw new common_1.ForbiddenException({
                message: 'invalid token'
            });
        }
        user.password = await (0, bcrypt_1.hash)(data.password, 10);
        try {
            await this.userRepo.save(user);
        }
        catch (error) {
            throw new common_1.ForbiddenException({
                message: 'invalid token'
            });
        }
        return {
            message: 'Password set successfully'
        };
    }
    async delete(id) {
        try {
            await this.userRepo.delete(id);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError) {
                throw new common_1.ForbiddenException({
                    message: 'invalid token'
                });
            }
        }
        return {
            message: 'User deleted successfully'
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_service_1.MailerService,
        zone_service_1.ZoneService,
        role_service_1.RoleService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map