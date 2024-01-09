"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workday_module_1 = require("../workday/workday.module");
const location_module_1 = require("../location/location.module");
const volunteer_entity_1 = require("./entities/volunteer.entity");
const volunteer_service_1 = require("./services/volunteer.service");
const volunteer_controller_1 = require("./controllers/volunteer.controller");
let VolunteerModule = class VolunteerModule {
};
VolunteerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([volunteer_entity_1.Volunteer]), location_module_1.LocationModule, workday_module_1.WorkdayModule],
        providers: [volunteer_service_1.VolunteerService],
        controllers: [volunteer_controller_1.VolunteerController]
    })
], VolunteerModule);
exports.VolunteerModule = VolunteerModule;
//# sourceMappingURL=volunteer.module.js.map