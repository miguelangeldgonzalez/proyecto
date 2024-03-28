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
exports.Volunteer = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_1 = require("../../common");
const workday_entity_1 = require("../../workday/entities/workday.entity");
const borough_entity_1 = require("../../location/entities/borough.entity");
let Volunteer = class Volunteer extends common_1.TimeStamps {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, identification: { required: true, type: () => Number }, name: { required: true, type: () => String }, phone: { required: true, type: () => String }, hasPet: { required: true, type: () => Boolean }, birthDate: { required: true, type: () => Date }, borough: { required: true, type: () => require("../../location/entities/borough.entity").Borough }, workdays: { required: true, type: () => [require("../../workday/entities/workday.entity").Workday] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Volunteer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", Number)
], Volunteer.prototype, "identification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Volunteer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], Volunteer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'has_pet',
        nullable: true
    }),
    __metadata("design:type", Boolean)
], Volunteer.prototype, "hasPet", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'birth_date',
        nullable: true,
        type: 'time without time zone'
    }),
    __metadata("design:type", Date)
], Volunteer.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => borough_entity_1.Borough, { nullable: false }),
    (0, typeorm_1.JoinColumn)({
        name: "borough_id"
    }),
    __metadata("design:type", borough_entity_1.Borough)
], Volunteer.prototype, "borough", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => workday_entity_1.Workday, workday => workday.volunteers, { nullable: false }),
    __metadata("design:type", Array)
], Volunteer.prototype, "workdays", void 0);
Volunteer = __decorate([
    (0, typeorm_1.Entity)()
], Volunteer);
exports.Volunteer = Volunteer;
//# sourceMappingURL=volunteer.entity.js.map