import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { createApplication, documentationBuilder } from './utils/bootstrap';
import * as morgan from 'morgan';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app = createApplication(app);

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('app.corsOrigin').split(','),
  });
  app.use(morgan('dev'));
  documentationBuilder(app, configService);
  await app.listen(configService.get('app.port'));
}
void bootstrap();
