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
exports.VolunteerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const zone_guard_1 = require("../../auth/guards/zone.guard");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const active_workday_guard_1 = require("../../auth/guards/active-workday.guard");
const volunteer_service_1 = require("../services/volunteer.service");
const volunteer_dto_1 = require("../dtos/volunteer.dto");
let VolunteerController = class VolunteerController {
    constructor(volunteerService) {
        this.volunteerService = volunteerService;
    }
    async getVolunteer(query) {
        if (!query.id && !query.identification) {
            throw new common_1.BadRequestException('Debe especificar un id o una identificación');
        }
        else {
            return await this.volunteerService.getVolunteer(query);
        }
    }
    async createVolunteer(body) {
        return this.volunteerService.createVolunteer(body);
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("../entities/volunteer.entity").Volunteer }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [volunteer_dto_1.GetVolunteerDTO]),
    __metadata("design:returntype", Promise)
], VolunteerController.prototype, "getVolunteer", null);
__decorate([
    (0, common_1.UseGuards)(zone_guard_1.ZoneGuard, active_workday_guard_1.ActiveWorkdayGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/volunteer.entity").Volunteer }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [volunteer_dto_1.CreateVolunteerDTO]),
    __metadata("design:returntype", Promise)
], VolunteerController.prototype, "createVolunteer", null);
VolunteerController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('volunteer'),
    __metadata("design:paramtypes", [volunteer_service_1.VolunteerService])
], VolunteerController);
exports.VolunteerController = VolunteerController;
//# sourceMappingURL=volunteer.controller.js.map