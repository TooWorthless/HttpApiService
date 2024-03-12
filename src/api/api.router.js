import { Router } from 'express';
import { apiController } from './api.controller.js';


const apiRouter = Router();


apiRouter.post('/postJson', apiController.postJson);


export {
    apiRouter
};