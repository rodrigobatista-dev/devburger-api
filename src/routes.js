import { Router } from 'express';
import multer from 'multer';
import multerCongig from './config/multer.js';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';

const routes = new Router();

const upload = multer(multerCongig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

export default routes;
