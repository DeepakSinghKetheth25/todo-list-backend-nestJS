import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule} from '@nestjs/swagger';
import { join } from 'path';
import * as exphbs from 'express-handlebars';

import flash = require('connect-flash');
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const options  = new DocumentBuilder()
  .setTitle('Todo App')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('todo',app,document);
  
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

    var cors = require('cors')

    app.use(cors());
    
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());



  await app.listen(3000);
}
bootstrap();
