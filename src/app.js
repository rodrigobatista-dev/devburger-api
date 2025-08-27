import express from 'express';
import routes from './routes.js';
import { resolve } from 'node:path';

import './database/index.js';

const name = 'rodrigo';

class App {
  constructor() {
    this.app = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(
      '/product-file',
      express.static(resolve(process.cwd(), 'uploads')),
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
