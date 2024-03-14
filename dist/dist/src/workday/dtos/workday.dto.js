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
exports.UpdateWorkdayDTO = exports.CreateWorkdayDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../common");
class CreateWorkdayDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { startTime: { required: true, type: () => Date }, endTime: { required: true, type: () => Date }, mediaDescription: { required: true, type: () => String }, externalAssistanceDescription: { required: true, type: () => String }, totalExternalAssistance: { required: true, type: () => Number }, workdayLocationId: { required: true, type: () => Number }, externalAssistanceIds: { required: true, type: () => [Number] }, mediaTypeIds: { required: true, type: () => [Number] } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateWorkdayDTO.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateWorkdayDTO.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkdayDTO.prototype, "mediaDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkdayDTO.prototype, "externalAssistanceDescription", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateWorkdayDTO.prototype, "totalExternalAssistance", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateWorkdayDTO.prototype, "workdayLocationId", void 0);
__decorate([
    (0, common_1.IsIdArray)({ minSize: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateWorkdayDTO.prototype, "externalAssistanceIds", void 0);
__decorate([
    (0, common_1.IsIdArray)({ minSize: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateWorkdayDTO.prototype, "mediaTypeIds", void 0);
exports.CreateWorkdayDTO = CreateWorkdayDTO;
class UpdateWorkdayDTO extends (0, swagger_1.PartialType)(CreateWorkdayDTO) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateWorkdayDTO = UpdateWorkdayDTO;
//# sourceMappingURL=workday.dto.js.map