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
exports.SetUserPasswordDto = exports.CreateUserDto = exports.CreateUserDtoRequest = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../common");
class CreateUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUser.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUser.prototype, "email", void 0);
class CreateUserDtoRequest extends CreateUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { states: { required: true, type: () => [Number] }, roleId: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, common_1.IsIdArray)({ maxSize: 23, minSize: 1 }),
    __metadata("design:type", Array)
], CreateUserDtoRequest.prototype, "states", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateUserDtoRequest.prototype, "roleId", void 0);
exports.CreateUserDtoRequest = CreateUserDtoRequest;
class CreateUserDto extends CreateUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { states: { required: true, type: () => [require("../../location/entities/state.entity").State] }, role: { required: true, type: () => require("../../auth/entities/role.entity").Role } };
    }
}
exports.CreateUserDto = CreateUserDto;
class SetUserPasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String, minLength: 8 } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(8),
    __metadata("design:type", String)
], SetUserPasswordDto.prototype, "password", void 0);
exports.SetUserPasswordDto = SetUserPasswordDto;
//# sourceMappingURL=user.dto.js.map