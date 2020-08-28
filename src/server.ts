import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';
import * as database from '@src/database';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import { ForeclastController } from './controllers/forecast';
import { BeachesController } from './controllers/beaches';
import { UsersController } from './controllers/users';
import logger from './logger';
import swaggerUi from 'swagger-ui-express';
import apiSchema from './api.schema.json';
import { OpenApiValidator } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();  
    }
    public async init(): Promise<void> {
        this.setupExpress();
        await this.docsSetup();
        this.setupControllers();
        await this.databaseSetup();
    }
  private setupExpress(): void {
      this.app.use(bodyParser.json());
      this.app.use(expressPino({
          logger,
      }));
      this.app.use(cors({
          origin: '*'
      }));
  }
  private setupControllers(): void {
      const forecastController = new ForeclastController();
      const beachesController = new BeachesController();
      const usersController = new UsersController;
      this.addControllers([forecastController, beachesController, usersController]);
  }

  private async docsSetup(): Promise<void>{
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
      await new OpenApiValidator({
          apiSpec: apiSchema as OpenAPIV3.Document,
          validateRequests: true,
          validateResponses: true,
      }).install(this.app)
  }

  public getApp(): Application {
      return this.app;
  }
  private async databaseSetup(): Promise<void>{
      await database.connect();
  }
  public async close(): Promise<void>{
      await database.close();
  }
  public start(): void{
      this.app.listen(this.port, ()=>{
          logger.info('Server listening of port: ' + this.port);
      })
  }
  
}
