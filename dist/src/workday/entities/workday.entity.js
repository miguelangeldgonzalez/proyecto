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
exports.Workday = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_1 = require("../../common");
const media_type_entity_1 = require("./media_type.entity");
const workday_location_entity_1 = require("./workday_location.entity");
const external_assistance_entity_1 = require("./external_assistance.entity");
const volunteer_entity_1 = require("../../volunteer/entities/volunteer.entity");
let Workday = class Workday extends common_1.TimeStamps {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, startTime: { required: true, type: () => Date }, endTime: { required: true, type: () => Date }, mediaDescription: { required: true, type: () => String }, externalAssistanceDescription: { required: true, type: () => String }, totalExternalAssistance: { required: true, type: () => Number }, totalCollected: { required: true, type: () => Number }, workdayLocation: { required: true, type: () => require("./workday_location.entity").WorkdayLocation }, mediaTypes: { required: true, type: () => [require("./media_type.entity").MediaType] }, externalAssistance: { required: true, type: () => [require("./external_assistance.entity").ExternalAssistance] }, volunteers: { required: true, type: () => [require("../../volunteer/entities/volunteer.entity").Volunteer] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Workday.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'start_time'
    }),
    __metadata("design:type", Date)
], Workday.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'end_time'
    }),
    __metadata("design:type", Date)
], Workday.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'media_description',
        nullable: true
    }),
    __metadata("design:type", String)
], Workday.prototype, "mediaDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_assistance_description',
        nullable: true
    }),
    __metadata("design:type", String)
], Workday.prototype, "externalAssistanceDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_external_assistance',
        nullable: true
    }),
    __metadata("design:type", Number)
], Workday.prototype, "totalExternalAssistance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_collected',
        nullable: true
    }),
    __metadata("design:type", Number)
], Workday.prototype, "totalCollected", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workday_location_entity_1.WorkdayLocation, { nullable: false }),
    (0, typeorm_1.JoinColumn)({
        name: 'workday_location_id',
    }),
    __metadata("design:type", workday_location_entity_1.WorkdayLocation)
], Workday.prototype, "workdayLocation", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => media_type_entity_1.MediaType),
    (0, typeorm_1.JoinTable)({
        name: 'workday_media_type',
        joinColumn: {
            name: 'workday_id'
        },
        inverseJoinColumn: {
            name: 'media_type_id'
        }
    }),
    __metadata("design:type", Array)
], Workday.prototype, "mediaTypes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => external_assistance_entity_1.ExternalAssistance),
    (0, typeorm_1.JoinTable)({
        name: 'workday_external_assistance',
        joinColumn: {
            name: 'workday_id'
        },
        inverseJoinColumn: {
            name: 'external_assistance_id'
        }
    }),
    __metadata("design:type", Array)
], Workday.prototype, "externalAssistance", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => volunteer_entity_1.Volunteer, volunteer => volunteer.workdays),
    (0, typeorm_1.JoinTable)({
        name: 'workday_volunteer',
        joinColumn: {
            name: 'workday_id'
        },
        inverseJoinColumn: {
            name: 'volunteer_id',
        }
    }),
    __metadata("design:type", Array)
], Workday.prototype, "volunteers", void 0);
Workday = __decorate([
    (0, typeorm_1.Entity)()
], Workday);
exports.Workday = Workday;
//# sourceMappingURL=workday.entity.js.map