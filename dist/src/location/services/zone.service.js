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
exports.ZoneService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const state_entity_1 = require("../entities/state.entity");
const borough_entity_1 = require("../entities/borough.entity");
const municipality_entity_1 = require("../entities/municipality.entity");
let ZoneService = class ZoneService {
    constructor(stateRepo, boroughRepo, municipalityRepo) {
        this.stateRepo = stateRepo;
        this.boroughRepo = boroughRepo;
        this.municipalityRepo = municipalityRepo;
    }
    async getStatesById(ids) {
        const states = await this.stateRepo.find({
            where: { id: (0, typeorm_1.In)(ids) }
        });
        if (states.length == 0)
            throw new common_1.NotFoundException({
                message: `No se encontraron estados con los ids ${JSON.stringify(ids)}`
            });
        return states;
    }
    async validateBoroughInStates(boroughId, stateIds) {
        return await this.boroughRepo.findOne({
            where: {
                id: boroughId,
                municipality: {
                    state: {
                        id: (0, typeorm_1.In)(stateIds)
                    }
                }
            },
            relations: ['municipality', 'municipality.state'],
        });
    }
    async findBoroughById(id) {
        const borough = await this.boroughRepo.findOne({
            where: { id },
            relations: ['municipality', 'municipality.state'],
        });
        if (!borough)
            throw new common_1.NotFoundException({
                message: `No se encontró la parroquia con el id ${id}`
            });
        return borough;
    }
};
ZoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(state_entity_1.State)),
    __param(1, (0, typeorm_2.InjectRepository)(borough_entity_1.Borough)),
    __param(2, (0, typeorm_2.InjectRepository)(municipality_entity_1.Municipality)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ZoneService);
exports.ZoneService = ZoneService;
//# sourceMappingURL=zone.service.js.map