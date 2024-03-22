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
exports.WorkdayService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const workday_entity_1 = require("../entities/workday.entity");
const media_type_entity_1 = require("../entities/media_type.entity");
const external_assistance_entity_1 = require("../entities/external_assistance.entity");
const workday_location_service_1 = require("./workday-location.service");
const role_entity_1 = require("../../auth/entities/role.entity");
let WorkdayService = class WorkdayService {
    constructor(workdayLocationService, workdayRepo, mediaTypeRepo, externalAssistanceRepo) {
        this.workdayLocationService = workdayLocationService;
        this.workdayRepo = workdayRepo;
        this.mediaTypeRepo = mediaTypeRepo;
        this.externalAssistanceRepo = externalAssistanceRepo;
    }
    async calculateVolunteers(workdayId) {
        const count = await this.workdayRepo.query('SELECT COUNT(*) FROM workday_volunteer WHERE workday_id = $1', [workdayId]);
        return parseInt(count[0].count) || 0;
    }
    async getById(workdayId) {
        const w = await this.workdayRepo.findOne({
            where: { id: workdayId },
            relations: ['mediaTypes', 'externalAssistance', 'workdayLocation', 'workdayLocation.borough']
        });
        w.totalVolunteers = await this.calculateVolunteers(workdayId);
        if (!w)
            throw new common_1.NotFoundException(`No se encontró la jornada con el id ${workdayId}`);
        return w;
    }
    async create(data) {
        var _a;
        const manyEntities = [
            {
                name: 'externalAssistanceIds',
                repo: this.externalAssistanceRepo,
                newName: 'externalAssistance'
            }, {
                name: 'mediaTypeIds',
                repo: this.mediaTypeRepo,
                newName: 'mediaTypes'
            }
        ];
        for (const e of manyEntities) {
            if (((_a = data[e.name]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const entities = await e.repo.find({
                    where: {
                        id: (0, typeorm_1.In)(data[e.name])
                    }
                });
                delete data[e.name];
                if (entities.length > 0)
                    data[e.newName] = entities;
            }
        }
        const workdayLocation = await this.workdayLocationService.getById(data.workdayLocationId);
        delete data.workdayLocationId;
        const workday = this.workdayRepo.create(Object.assign(Object.assign({}, data), { workdayLocation }));
        return await this.workdayRepo.save(workday);
    }
    async getWorkdayById(id) {
        const workday = await this.workdayRepo.findOne({
            where: { id },
            relations: ['workdayLocation', 'workdayLocation.borough']
        });
        if (!workday)
            throw new common_1.NotFoundException(`No se encontró la jornada con el id ${id}`);
        return workday;
    }
    async checkActiveWorkday(id) {
        const workday = await this.workdayRepo.findOne({
            where: {
                id,
                endTime: (0, typeorm_1.MoreThanOrEqual)(new Date(Date.now()))
            }
        });
        if (!workday)
            throw new common_1.UnauthorizedException(`La jornada con el id ${id} ya se cerró`);
        return true;
    }
    async getWorkdays(role, stateIds) {
        const relations = ['workdayLocation', 'workdayLocation.borough', 'workdayLocation.borough.municipality', 'workdayLocation.borough.municipality.state', 'mediaTypes', 'externalAssistance'];
        const order = { endTime: 'DESC' };
        const where = {
            workdayLocation: {
                borough: {
                    municipality: {
                        state: {
                            id: (0, typeorm_1.In)(stateIds)
                        }
                    }
                }
            }
        };
        switch (role) {
            case role_entity_1.RoleNames.ADMIN:
                return await this.workdayRepo.find({
                    relations,
                    order
                });
            case role_entity_1.RoleNames.STATE_MANAGER:
                return await this.workdayRepo.find({
                    where,
                    relations,
                    order
                });
            case role_entity_1.RoleNames.VOLUNTEER:
                return await this.workdayRepo.find({
                    where: Object.assign({ endTime: (0, typeorm_1.MoreThanOrEqual)(new Date(Date.now())) }, where),
                    relations: ['workdayLocation', 'workdayLocation.borough'],
                    order
                });
        }
    }
    async delete(id) {
        const workday = await this.workdayRepo.findOne({
            where: { id }
        });
        if (!workday)
            throw new common_1.NotFoundException(`No se encontró la jornada con el id ${id}`);
        return await this.workdayRepo.remove(workday);
    }
    async getWorkdayMetadata() {
        return {
            mediaTypes: await this.mediaTypeRepo.find(),
            externalAssistance: await this.externalAssistanceRepo.find()
        };
    }
    async update(workdayId, body) {
        var _a;
        const workday = await this.workdayRepo.findOne({
            where: { id: workdayId },
            relations: ['mediaTypes', 'externalAssistance']
        });
        if (!workday)
            throw new common_1.NotFoundException(`No se encontró la jornada con el id ${workdayId}`);
        const manyEntities = [
            {
                name: 'externalAssistanceIds',
                repo: this.externalAssistanceRepo,
                newName: 'externalAssistance'
            }, {
                name: 'mediaTypeIds',
                repo: this.mediaTypeRepo,
                newName: 'mediaTypes'
            }
        ];
        for (const e of manyEntities) {
            if (((_a = body[e.name]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const entities = await e.repo.find({
                    where: {
                        id: (0, typeorm_1.In)(body[e.name])
                    }
                });
                delete body[e.name];
                if (entities.length > 0)
                    workday[e.newName] = entities;
            }
        }
        return await this.workdayRepo.save(Object.assign(Object.assign({}, workday), body));
    }
};
WorkdayService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(workday_entity_1.Workday)),
    __param(2, (0, typeorm_2.InjectRepository)(media_type_entity_1.MediaType)),
    __param(3, (0, typeorm_2.InjectRepository)(external_assistance_entity_1.ExternalAssistance)),
    __metadata("design:paramtypes", [workday_location_service_1.WorkdayLocationService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], WorkdayService);
exports.WorkdayService = WorkdayService;
//# sourceMappingURL=workday.service.js.map