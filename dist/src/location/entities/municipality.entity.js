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
exports.Municipality = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const state_entity_1 = require("./state.entity");
const borough_entity_1 = require("./borough.entity");
let Municipality = class Municipality {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, state: { required: true, type: () => require("./state.entity").State }, boroughs: { required: true, type: () => [require("./borough.entity").Borough] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Municipality.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        unique: true
    }),
    __metadata("design:type", String)
], Municipality.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => state_entity_1.State),
    (0, typeorm_1.JoinColumn)({
        name: "state_id"
    }),
    __metadata("design:type", state_entity_1.State)
], Municipality.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => borough_entity_1.Borough, borough => borough.municipality),
    __metadata("design:type", Array)
], Municipality.prototype, "boroughs", void 0);
Municipality = __decorate([
    (0, typeorm_1.Entity)()
], Municipality);
exports.Municipality = Municipality;
//# sourceMappingURL=municipality.entity.js.map