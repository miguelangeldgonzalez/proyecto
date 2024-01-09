"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const state_entity_1 = require("./entities/state.entity");
const borough_entity_1 = require("./entities/borough.entity");
const municipality_entity_1 = require("./entities/municipality.entity");
const zone_service_1 = require("./services/zone.service");
let LocationModule = class LocationModule {
};
LocationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([state_entity_1.State, municipality_entity_1.Municipality, borough_entity_1.Borough])],
        providers: [zone_service_1.ZoneService],
        exports: [zone_service_1.ZoneService]
    })
], LocationModule);
exports.LocationModule = LocationModule;
//# sourceMappingURL=location.module.js.map