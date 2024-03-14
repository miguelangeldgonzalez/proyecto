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
exports.State = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const municipality_entity_1 = require("./municipality.entity");
let State = class State {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, municipalities: { required: true, type: () => [require("./municipality.entity").Municipality] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], State.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        unique: true
    }),
    __metadata("design:type", String)
], State.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => municipality_entity_1.Municipality, municipality => municipality.state),
    __metadata("design:type", Array)
], State.prototype, "municipalities", void 0);
State = __decorate([
    (0, typeorm_1.Entity)()
], State);
exports.State = State;
//# sourceMappingURL=state.entity.js.map