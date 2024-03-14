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
exports.MediaType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const workday_entity_1 = require("./workday.entity");
let MediaType = class MediaType {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, workday: { required: true, type: () => [require("./workday.entity").Workday] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MediaType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MediaType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => workday_entity_1.Workday),
    __metadata("design:type", Array)
], MediaType.prototype, "workday", void 0);
MediaType = __decorate([
    (0, typeorm_1.Entity)()
], MediaType);
exports.MediaType = MediaType;
//# sourceMappingURL=media_type.entity.js.map