import { INestApplicationContext, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpAdapterHost, ModuleRef } from '@nestjs/core';
import cds from '@sap/cds';
import { ODataService } from './odata.service';
import * as model from './model.json'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ODataService],
  exports: []
})
export class AppModule implements NestModule {
  constructor(private moduleRef: ModuleRef, private odataService: ODataService, private adapterHost: HttpAdapterHost) {  }

  async configure(_consumer: MiddlewareConsumer) {
    await cds
        .serve('SampleService')
        .in(this.adapterHost.httpAdapter as any)
        .from("cds")
        .at("/odata")
        .with(this.odataService.serviceHandler);
    cds.model = model as any;
  }
}