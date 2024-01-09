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
exports.WorkdayLocationService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const workday_location_entity_1 = require("../entities/workday_location.entity");
const zone_service_1 = require("../../location/services/zone.service");
let WorkdayLocationService = class WorkdayLocationService {
    constructor(workdayLocationRepo, zoneService) {
        this.workdayLocationRepo = workdayLocationRepo;
        this.zoneService = zoneService;
    }
    async create(data) {
        var borough = await this.zoneService.findBoroughById(data.boroughId);
        delete data.boroughId;
        const location = await this.workdayLocationRepo.create(Object.assign(Object.assign({}, data), { borough }));
        return await this.workdayLocationRepo.save(location);
    }
    async getById(id) {
        const location = await this.workdayLocationRepo.findOne({
            where: { id },
            relations: ['borough']
        });
        if (!location)
            throw new common_1.NotFoundException('No se encontró la locación');
        return location;
    }
    async getByWorkdayId(workdayId) {
        const location = await this.workdayLocationRepo.findOne({
            where: {
                workdays: { id: workdayId }
            },
            relations: ['borough']
        });
        if (!location)
            throw new common_1.NotFoundException('No se encontró la locacion con la jornada especificada');
        return location;
    }
};
WorkdayLocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(workday_location_entity_1.WorkdayLocation)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        zone_service_1.ZoneService])
], WorkdayLocationService);
exports.WorkdayLocationService = WorkdayLocationService;
//# sourceMappingURL=workday-location.service.js.map