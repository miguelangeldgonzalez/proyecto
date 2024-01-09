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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../auth/entities/role.entity");
const state_entity_1 = require("../../location/entities/state.entity");
const common_1 = require("../../common");
let User = class User extends common_1.TimeStamps {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, states: { required: true, type: () => [require("../../location/entities/state.entity").State] }, role: { required: true, type: () => require("../../auth/entities/role.entity").Role } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => state_entity_1.State),
    (0, typeorm_1.JoinTable)({
        name: 'user_state',
        joinColumn: {
            name: 'user_id'
        },
        inverseJoinColumn: {
            name: 'state_id'
        }
    }),
    __metadata("design:type", Array)
], User.prototype, "states", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role),
    (0, typeorm_1.JoinColumn)({
        name: "role_id"
    }),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map