import express, { Application } from 'express';
import cors from 'cors';

import routes from '../routes';
import Database from '../database';
import databaseErr from './middlewares/databaseErr';

import 'dotenv/config';

export default class App {
  application: Application;

  constructor() {
    this.application = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.application.use(express.json());
    this.application.use(cors());
  }

  private async routes(): Promise<void> {
    if (!(await Database.run())) {
      this.application.use(databaseErr);
    }

    this.application.use(routes);
  }

  public run(): void {
    this.application.listen(process.env.PORT || 3333, () => {
      console.log('🚀 Backend started');
    });
  }
}
