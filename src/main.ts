import { join } from 'path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    await app.listen(3000);

  // enable environment variables

  //
  //
  // // CORS
  // server.enableCors();
  //
  // // improve security
  // server.use(require('helmet')());
  //
  // // improve performance
  // server.use(require('compression')());
  //
  // // enable cookie
  // server.use(require('cookie-parser')());
  //
  // // enable json response
  // server.use(require('body-parser').urlencoded({ extended: true }));
  // server.use(require('body-parser').json());
  //
  // // production ready session store
  // const pgSession = require('connect-pg-simple')(session);
  // server.use(session({
  //   secret: process.env.SESSION_SECRET,
  //   store: new pgSession({
  //     conString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  //     crear_interval: 60 * 60 // sec
  //   }),
  //   resave: false,
  //   saveUninitialized: false,
  //   rolling: true,
  //   cookie: {
  //     httpOnly: false,
  //     maxAge: 60 * 60 * 1000 // msec
  //   }
  // }));
  //
  // // enable passport session
  // server.use(passport.initialize());
  // server.use(passport.session());
  // passport.serializeUser((user, cb) => cb(null, user));
  // passport.deserializeUser((obj, cb) => cb(null, obj));
  //
  // // start server
  // await server.listenAsync(process.env.PORT, '0.0.0.0');
}

bootstrap();
