"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../config");
const state_entity_1 = require("../location/entities/state.entity");
const workday_entity_1 = require("../workday/entities/workday.entity");
const borough_entity_1 = require("../location/entities/borough.entity");
const municipality_entity_1 = require("../location/entities/municipality.entity");
const workday_location_entity_1 = require("../workday/entities/workday_location.entity");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.default.KEY],
                useFactory: (configService) => {
                    return {
                        type: 'postgres',
                        url: configService.postgres.url,
                        entities: [workday_location_entity_1.WorkdayLocation, borough_entity_1.Borough, municipality_entity_1.Municipality, state_entity_1.State, workday_entity_1.Workday],
                        synchronize: false,
                        autoLoadEntities: true,
                        logging: true,
                    };
                }
            })
        ]
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map