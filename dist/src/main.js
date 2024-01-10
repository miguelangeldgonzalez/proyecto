"use strict";
console.log(main);
process.setMaxListeners(0);
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Proyecto Sirena')
        .setDescription('API de Poryecto Sirena')
        .setVersion('1.0')
        .addTag('sirena')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map