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
exports.WorkdayLocation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_1 = require("../../common");
const workday_entity_1 = require("./workday.entity");
const borough_entity_1 = require("../../location/entities/borough.entity");
let WorkdayLocation = class WorkdayLocation extends common_1.TimeStamps {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, description: { required: true, type: () => String }, title: { required: true, type: () => String }, locationUrl: { required: true, type: () => String }, workdays: { required: true, type: () => [require("./workday.entity").Workday] }, borough: { required: true, type: () => require("../../location/entities/borough.entity").Borough } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkdayLocation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], WorkdayLocation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkdayLocation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], WorkdayLocation.prototype, "locationUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workday_entity_1.Workday, workday => workday.workdayLocation),
    __metadata("design:type", Array)
], WorkdayLocation.prototype, "workdays", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => borough_entity_1.Borough, {
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'borough_id',
    }),
    __metadata("design:type", borough_entity_1.Borough)
], WorkdayLocation.prototype, "borough", void 0);
WorkdayLocation = __decorate([
    (0, typeorm_1.Entity)()
], WorkdayLocation);
exports.WorkdayLocation = WorkdayLocation;
//# sourceMappingURL=workday_location.entity.js.map