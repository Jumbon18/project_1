import {NestFactory} from '@nestjs/core';
import {AppModule} from 'AppModule';
import {NestExpressApplication} from "@nestjs/platform-express";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const port = 3000;

    //region Swagger
    const swaggerPath = "docs";

    const options = new DocumentBuilder()
        .setTitle('Film Pass')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(
        'docs', app, document,
        {
            customSiteTitle: "FilmPass Swagger Docs",
        }
    );

    const swaggerUrl = `http://localhost:${port}/${swaggerPath}`;
    //endregion

    await app.listen(port);

    console.info(`Swagger docs: ${swaggerUrl}`);
}
bootstrap();
