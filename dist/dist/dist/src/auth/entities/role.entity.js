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
var Role_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.RoleNames = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
var RoleNames;
(function (RoleNames) {
    RoleNames["ADMIN"] = "ADMIN";
    RoleNames["STATE_MANAGER"] = "STATE_MANAGER";
    RoleNames["VOLUNTEER"] = "VOLUNTEER";
})(RoleNames = exports.RoleNames || (exports.RoleNames = {}));
let Role = Role_1 = class Role {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, user: { required: true, type: () => [require("../../user/entities/user.entity").User] }, permissions: { required: true, type: () => [require("./permission.entity").Permission] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, user => user.role),
    __metadata("design:type", Array)
], Role.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Role_1),
    (0, typeorm_1.JoinTable)({
        name: 'role_permission',
        joinColumn: {
            name: 'role_id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
        }
    }),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
Role = Role_1 = __decorate([
    (0, typeorm_1.Entity)()
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map