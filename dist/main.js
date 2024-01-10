"use strict";
require('events').EventEmitter.defaultMaxListeners = 100;
require('events').EventEmitter.prototype._maxListeners = 100;

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map