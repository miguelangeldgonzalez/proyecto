"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const mailer_module_1 = require("./mailer/mailer.module");
const workday_module_1 = require("./workday/workday.module");
const location_module_1 = require("./location/location.module");
const database_module_1 = require("./database/database.module");
const volunteer_module_1 = require("./volunteer/volunteer.module");
const analytics_module_1 = require("./analytics/analytics.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                load: [config_2.default],
                isGlobal: true
            }),
            location_module_1.LocationModule, database_module_1.DatabaseModule,
            workday_module_1.WorkdayModule, volunteer_module_1.VolunteerModule,
            user_module_1.UserModule, auth_module_1.AuthModule, mailer_module_1.MailerModule,
            analytics_module_1.AnalyticsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map