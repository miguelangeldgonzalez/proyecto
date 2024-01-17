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
exports.WorkdayController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../../auth/guards/role.guard");
const role_entity_1 = require("../../auth/entities/role.entity");
const role_decorator_1 = require("../../auth/decorators/role.decorator");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const workday_dto_1 = require("../dtos/workday.dto");
const zone_guard_1 = require("../../auth/guards/zone.guard");
const workday_service_1 = require("../services/workday.service");
let WorkdayController = class WorkdayController {
    constructor(workdayService) {
        this.workdayService = workdayService;
    }
    async create(body) {
        return await this.workdayService.create(body);
    }
    async getWorkdays({ user }) {
        let stateIds = user.role.name === role_entity_1.RoleNames.ADMIN ?
            null :
            user.states.map(state => state.id);
        const role = user.role.name;
        return await this.workdayService.getWorkdays(role, stateIds);
    }
};
__decorate([
    (0, role_decorator_1.Roles)(role_entity_1.RoleNames.ADMIN, role_entity_1.RoleNames.STATE_MANAGER),
    (0, common_1.UseGuards)(zone_guard_1.ZoneGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/workday.entity").Workday }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workday_dto_1.CreateWorkdayDTO]),
    __metadata("design:returntype", Promise)
], WorkdayController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/workday.entity").Workday] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkdayController.prototype, "getWorkdays", null);
WorkdayController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Controller)('workday'),
    __metadata("design:paramtypes", [workday_service_1.WorkdayService])
], WorkdayController);
exports.WorkdayController = WorkdayController;
//# sourceMappingURL=workday.controller.js.map