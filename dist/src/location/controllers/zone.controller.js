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
exports.ZoneController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const zone_service_1 = require("../services/zone.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let ZoneController = class ZoneController {
    constructor(zoneService) {
        this.zoneService = zoneService;
    }
    getStates(ids) {
        let stateIds;
        if (!ids)
            return this.zoneService.getStates();
        try {
            stateIds = JSON.parse(ids);
        }
        catch (_a) {
            throw new common_1.BadRequestException(`El parámetro ids debe ser un array de números`);
        }
        return this.zoneService.getStates(stateIds);
    }
    getMunicipalitiesByStateId(stateId) {
        return this.zoneService.getMunicipalitiesByStateId(stateId);
    }
    getBoroughsByMunicipalityId(municipalityId) {
        return this.zoneService.getBoroughsByMunicipalityId(municipalityId);
    }
};
__decorate([
    (0, common_1.Get)('states'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/state.entity").State] }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "getStates", null);
__decorate([
    (0, common_1.Get)('municipalities/:stateId'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/municipality.entity").Municipality] }),
    __param(0, (0, common_1.Param)('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "getMunicipalitiesByStateId", null);
__decorate([
    (0, common_1.Get)('boroughs/:municipalityId'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/borough.entity").Borough] }),
    __param(0, (0, common_1.Param)('municipalityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "getBoroughsByMunicipalityId", null);
ZoneController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('zone'),
    __metadata("design:paramtypes", [zone_service_1.ZoneService])
], ZoneController);
exports.ZoneController = ZoneController;
//# sourceMappingURL=zone.controller.js.map