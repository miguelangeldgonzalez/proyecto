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
exports.WorkdayLocationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const zone_guard_1 = require("../../auth/guards/zone.guard");
const role_guard_1 = require("../../auth/guards/role.guard");
const role_entity_1 = require("../../auth/entities/role.entity");
const role_decorator_1 = require("../../auth/decorators/role.decorator");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const workday_location_dto_1 = require("../dtos/workday-location.dto");
const workday_location_service_1 = require("../services/workday-location.service");
let WorkdayLocationController = class WorkdayLocationController {
    constructor(workdayLocationService) {
        this.workdayLocationService = workdayLocationService;
    }
    async create(body) {
        return await this.workdayLocationService.create(body);
    }
    async getWorkdayLocations({ user }, { boroughId }) {
        boroughId = parseInt(boroughId);
        let stateIds = user.role.name === role_entity_1.RoleNames.ADMIN ?
            null :
            user.states.map(state => state.id);
        const role = user.role.name;
        return await this.workdayLocationService.getWorkdayLocations(role, stateIds, boroughId);
    }
};
__decorate([
    (0, role_decorator_1.Roles)(role_entity_1.RoleNames.ADMIN, role_entity_1.RoleNames.STATE_MANAGER),
    (0, common_1.UseGuards)(zone_guard_1.ZoneGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/workday_location.entity").WorkdayLocation }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workday_location_dto_1.CreateWorkdayLocationDTO]),
    __metadata("design:returntype", Promise)
], WorkdayLocationController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(role_entity_1.RoleNames.ADMIN, role_entity_1.RoleNames.STATE_MANAGER),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/workday_location.entity").WorkdayLocation] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkdayLocationController.prototype, "getWorkdayLocations", null);
WorkdayLocationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Controller)('workday-location'),
    __metadata("design:paramtypes", [workday_location_service_1.WorkdayLocationService])
], WorkdayLocationController);
exports.WorkdayLocationController = WorkdayLocationController;
//# sourceMappingURL=workday-location.controller.js.map