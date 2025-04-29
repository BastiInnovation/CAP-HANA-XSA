import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { XsaService,XssecPassportStrategy, SECURITY_CONTEXT } from '@sap/xssec';
import { Passport } from 'passport';
import helmet from 'helmet'
import * as xsenv from '@sap/xsenv';
import { getXsuaaService } from '@sap-cloud-sdk/connectivity/dist/scp-cf';

function unless(middleware, ...paths) {
  return function(req, res, next) {
    const pathCheck = paths.some(path => req.path.startsWith(path));
    pathCheck ? next() : middleware(req, res, next);
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  if(! process.env.DEBUG ) {
    const passport = new Passport();
    const authService = new XsaService(xsenv.getServices({uaa: {tag: 'xsuaa'}}).uaa);
    passport.use(new XssecPassportStrategy(authService, SECURITY_CONTEXT));
    app.use(passport.initialize());
    app.use(unless(passport.authenticate('JWT', {session: false}), '/callback/v1.0/', '/api/onboarding/', '/api/offboarding/'));
  }
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();