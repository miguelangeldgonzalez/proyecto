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
exports.ActiveWorkdayGuard = void 0;
const common_1 = require("@nestjs/common");
const workday_service_1 = require("../../workday/services/workday.service");
const role_entity_1 = require("../entities/role.entity");
let ActiveWorkdayGuard = class ActiveWorkdayGuard {
    constructor(workdayService) {
        this.workdayService = workdayService;
    }
    async canActivate(context) {
        const { body, user } = context.switchToHttp().getRequest();
        if (user.role.name == role_entity_1.RoleNames.ADMIN)
            return true;
        if (!body.workdayId)
            return false;
        const workday = await this.workdayService.checkActiveWorkday(body.workdayId);
        if (workday)
            return true;
        else
            return false;
    }
};
ActiveWorkdayGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workday_service_1.WorkdayService])
], ActiveWorkdayGuard);
exports.ActiveWorkdayGuard = ActiveWorkdayGuard;
//# sourceMappingURL=active-workday.guard.js.map