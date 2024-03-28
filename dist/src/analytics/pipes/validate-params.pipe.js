"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsPipe = void 0;
const common_1 = require("@nestjs/common");
const anlytics_constant_1 = require("../constants/anlytics.constant");
let AnalyticsPipe = class AnalyticsPipe {
    validateRegionality(value) {
        if (Object.values(anlytics_constant_1.Regionalities).includes(value)) {
            return value;
        }
        throw new common_1.BadRequestException(`Regionality must be one of this [${Object.values(anlytics_constant_1.Regionalities)}]`);
    }
    validateCount(value) {
        if (Object.values(anlytics_constant_1.Count).includes(value)) {
            return value;
        }
        throw new common_1.BadRequestException(`Count must be one of this [${Object.values(anlytics_constant_1.Count)}]`);
    }
    transform(value, metadata) {
        switch (metadata.data) {
            case 'regionality':
                return this.validateRegionality(value);
            case 'count':
                return this.validateCount(value);
        }
        throw new common_1.BadRequestException('Invalid value');
    }
};
AnalyticsPipe = __decorate([
    (0, common_1.Injectable)()
], AnalyticsPipe);
exports.AnalyticsPipe = AnalyticsPipe;
//# sourceMappingURL=validate-params.pipe.js.map