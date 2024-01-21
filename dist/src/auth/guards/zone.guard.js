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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneGuard = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("../entities/role.entity");
const zone_service_1 = require("../../location/services/zone.service");
const workday_service_1 = require("../../workday/services/workday.service");
const workday_location_service_1 = require("../../workday/services/workday-location.service");
let ZoneGuard = class ZoneGuard {
    constructor(workday, zoneService, workdayLocationService) {
        this.workday = workday;
        this.zoneService = zoneService;
        this.workdayLocationService = workdayLocationService;
    }
    async canActivate(context) {
        var _a;
        const { user, body: data } = context.switchToHttp().getRequest();
        const workdayIdByParam = context.switchToHttp().getRequest().params.workdayId;
        const workdayLocationIdByParam = context.switchToHttp().getRequest().params.workdayLocationId;
        let boroughId;
        if ((data === null || data === void 0 ? void 0 : data.workdayLocationId) || workdayLocationIdByParam) {
            const location = await this.workdayLocationService.getById((_a = data.workdayLocationId) !== null && _a !== void 0 ? _a : workdayLocationIdByParam);
            boroughId = location.borough.id;
        }
        else if (data === null || data === void 0 ? void 0 : data.workdayId) {
            const location = await this.workdayLocationService.getByWorkdayId(data.workdayId);
            boroughId = location.borough.id;
        }
        else if (data === null || data === void 0 ? void 0 : data.boroughId) {
            boroughId = data.boroughId;
        }
        else if (workdayIdByParam) {
            const workday = await this.workday.getWorkdayById(workdayIdByParam);
            boroughId = workday.workdayLocation.borough.id;
        }
        if (boroughId) {
            return await this.validateBorough(boroughId, user);
        }
        else {
            return false;
        }
    }
    async validateBorough(boroughId, user) {
        let borough;
        switch (user.role.name) {
            case role_entity_1.RoleNames.VOLUNTEER:
            case role_entity_1.RoleNames.STATE_MANAGER:
                borough = await this.zoneService.validateBoroughInStates(boroughId, user.states.map(state => state.id));
                if (!borough)
                    throw new common_1.UnauthorizedException('La parroquia no pertenece a ninguno de los estados del usuario');
                return true;
            case role_entity_1.RoleNames.ADMIN:
                borough = await this.zoneService.findBoroughById(boroughId);
                if (!borough)
                    throw new common_1.NotFoundException('No se encontró la parroquia');
                return true;
            default:
                return false;
        }
    }
};
ZoneGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workday_service_1.WorkdayService,
        zone_service_1.ZoneService,
        workday_location_service_1.WorkdayLocationService])
], ZoneGuard);
exports.ZoneGuard = ZoneGuard;
//# sourceMappingURL=zone.guard.js.map