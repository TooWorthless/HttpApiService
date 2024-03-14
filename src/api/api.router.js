import { Router } from 'express';
import { apiController } from './api.controller.js';


const apiRouter = Router();


apiRouter.post('/postDirectMessage', apiController.postDirectMessage);
apiRouter.post('/postBroadcastMessage', apiController.postBroadcastMessage);


export {
    apiRouter
};