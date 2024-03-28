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
exports.AnalyticsService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const volunteer_entity_1 = require("../../volunteer/entities/volunteer.entity");
const anlytics_constant_1 = require("../constants/anlytics.constant");
const anlitycs_sql_1 = require("./anlitycs.sql");
let AnalyticsService = class AnalyticsService {
    constructor(volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }
    async getAnalytics(regionality, count) {
        switch (count) {
            case anlytics_constant_1.Count.AGE:
                return await this.volunteerRepository.query((0, anlitycs_sql_1.averageAge)(regionality));
            case anlytics_constant_1.Count.DONATION:
                return await this.volunteerRepository.query((0, anlitycs_sql_1.totalCollected)(regionality));
            case anlytics_constant_1.Count.HAS_PET:
                return await this.volunteerRepository.query((0, anlitycs_sql_1.averageHasPet)(regionality));
            case anlytics_constant_1.Count.VOLUNTEERS:
                return await this.volunteerRepository.query((0, anlitycs_sql_1.totalVolunteers)(regionality));
        }
    }
};
AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(volunteer_entity_1.Volunteer)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AnalyticsService);
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map