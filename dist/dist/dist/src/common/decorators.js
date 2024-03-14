"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIdArray = void 0;
const class_validator_1 = require("class-validator");
function IsIdArray({ maxSize, minSize }) {
    return function (target, propertyKey) {
        (0, class_validator_1.IsArray)()(target, propertyKey);
        (0, class_validator_1.IsInt)({ each: true })(target, propertyKey);
        (0, class_validator_1.ArrayUnique)()(target, propertyKey);
        if (maxSize)
            (0, class_validator_1.ArrayMaxSize)(maxSize)(target, propertyKey);
        if (minSize)
            (0, class_validator_1.ArrayMinSize)(minSize)(target, propertyKey);
    };
}
exports.IsIdArray = IsIdArray;
//# sourceMappingURL=decorators.js.map