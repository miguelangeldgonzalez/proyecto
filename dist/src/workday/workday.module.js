"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkdayModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workday_service_1 = require("./services/workday.service");
const workday_location_service_1 = require("./services/workday-location.service");
const workday_controller_1 = require("./controllers/workday.controller");
const workday_location_controller_1 = require("./controllers/workday-location.controller");
const workday_entity_1 = require("./entities/workday.entity");
const media_type_entity_1 = require("./entities/media_type.entity");
const workday_location_entity_1 = require("./entities/workday_location.entity");
const external_assistance_entity_1 = require("./entities/external_assistance.entity");
const location_module_1 = require("../location/location.module");
let WorkdayModule = class WorkdayModule {
};
WorkdayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([external_assistance_entity_1.ExternalAssistance, media_type_entity_1.MediaType, workday_location_entity_1.WorkdayLocation, workday_entity_1.Workday]),
            location_module_1.LocationModule
        ],
        controllers: [workday_controller_1.WorkdayController, workday_location_controller_1.WorkdayLocationController],
        providers: [workday_service_1.WorkdayService, workday_location_service_1.WorkdayLocationService],
        exports: [workday_service_1.WorkdayService, workday_location_service_1.WorkdayLocationService]
    })
], WorkdayModule);
exports.WorkdayModule = WorkdayModule;
//# sourceMappingURL=workday.module.js.map