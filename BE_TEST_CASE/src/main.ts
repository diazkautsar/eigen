import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/allException.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = +process.env.PORT;
  const validationPipe = new ValidationPipe();
  const httpAdapterHost = new HttpAdapterHost();
  const allExceptionFilter = new AllExceptionFilter(httpAdapterHost);

  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(allExceptionFilter);
  app.enableCors();
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('EIGEN-TEST')
    .setDescription('EIGEN TEST')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT, () => {
    console.log(`SERVICE RUNNING ON PORT: ${PORT}`);
  });
}
bootstrap();
