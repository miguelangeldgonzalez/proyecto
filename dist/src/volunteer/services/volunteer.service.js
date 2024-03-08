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
exports.VolunteerService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const zone_service_1 = require("../../location/services/zone.service");
const workday_service_1 = require("../../workday/services/workday.service");
const volunteer_entity_1 = require("../entities/volunteer.entity");
let VolunteerService = class VolunteerService {
    constructor(zoneService, workdayService, volunteerRepository) {
        this.zoneService = zoneService;
        this.workdayService = workdayService;
        this.volunteerRepository = volunteerRepository;
    }
    async getVolunteer(query) {
        const volunteer = await this.volunteerRepository.findOne({
            where: query
        });
        if (!volunteer) {
            throw new common_1.NotFoundException(`No se encontró el voluntario con estos parametros ${JSON.stringify(query)}`);
        }
        else {
            return volunteer;
        }
    }
    async createVolunteer(data) {
        const borough = await this.zoneService.findBoroughById(data.boroughId);
        const workday = await this.workdayService.getWorkdayById(data.workdayId);
        const volunteer = this.volunteerRepository.create(Object.assign({ borough, workdays: [workday] }, data));
        try {
            return await this.volunteerRepository.save(volunteer);
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                if (error.driverError.detail.includes('identification')) {
                    return await this.addWorkdayToExistVolunteer(data);
                }
            }
            throw new common_1.InternalServerErrorException('Error al crear el voluntario');
        }
    }
    async addWorkdayToExistVolunteer(data) {
        const volunteer = await this.volunteerRepository.findOne({
            where: {
                identification: data.identification
            },
            relations: ['workdays', 'workdays.workdayLocation', 'borough']
        });
        if (!volunteer) {
            throw new common_1.NotFoundException('No se encontró el voluntario con esta identificación');
        }
        const workday = await this.workdayService.getWorkdayById(data.workdayId);
        if (!volunteer.workdays.some(w => w.id === workday.id)) {
            volunteer.workdays.push(workday);
        }
        if (volunteer.borough.id !== data.boroughId) {
            volunteer.borough = await this.zoneService.findBoroughById(data.boroughId);
        }
        try {
            return await this.volunteerRepository.save(Object.assign(Object.assign({}, volunteer), data));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al agregar el día de trabajo al voluntario');
        }
    }
};
VolunteerService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(volunteer_entity_1.Volunteer)),
    __metadata("design:paramtypes", [zone_service_1.ZoneService,
        workday_service_1.WorkdayService,
        typeorm_1.Repository])
], VolunteerService);
exports.VolunteerService = VolunteerService;
//# sourceMappingURL=volunteer.service.js.map