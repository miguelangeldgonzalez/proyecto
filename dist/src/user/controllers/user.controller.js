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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../../auth/guards/role.guard");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const user_service_1 = require("../services/user.service");
const role_entity_1 = require("../../auth/entities/role.entity");
const role_decorator_1 = require("../../auth/decorators/role.decorator");
const user_dto_1 = require("../dtos/user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(body) {
        return await this.userService.create(body);
    }
    async delete(id) {
        return await this.userService.delete(id);
    }
    async setPassword(body, { user }) {
        return await this.userService.setPassword(body, user.userId);
    }
};
__decorate([
    (0, role_decorator_1.Roles)(role_entity_1.RoleNames.ADMIN),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDtoRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(role_entity_1.RoleNames.ADMIN),
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)('set-password'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.SetUserPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setPassword", null);
UserController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map