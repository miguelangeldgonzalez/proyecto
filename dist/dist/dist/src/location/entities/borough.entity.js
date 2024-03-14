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
exports.Borough = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const municipality_entity_1 = require("./municipality.entity");
const workday_location_entity_1 = require("../../workday/entities/workday_location.entity");
let Borough = class Borough {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, municipality: { required: true, type: () => require("./municipality.entity").Municipality }, workdaysLocations: { required: true, type: () => [require("../../workday/entities/workday_location.entity").WorkdayLocation] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Borough.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        unique: true
    }),
    __metadata("design:type", String)
], Borough.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => municipality_entity_1.Municipality),
    (0, typeorm_1.JoinColumn)({
        name: 'municipality_id'
    }),
    __metadata("design:type", municipality_entity_1.Municipality)
], Borough.prototype, "municipality", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workday_location_entity_1.WorkdayLocation, workdayLocation => workdayLocation.borough),
    __metadata("design:type", Array)
], Borough.prototype, "workdaysLocations", void 0);
Borough = __decorate([
    (0, typeorm_1.Entity)()
], Borough);
exports.Borough = Borough;
//# sourceMappingURL=borough.entity.js.map