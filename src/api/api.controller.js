import { AMQPService } from '../messageBroker/amqpService.js';

const apiController = {};


apiController.postJson = async (req, res, next) => {
    try {
        const message = JSON.stringify(req.body);


        res.status(200).send(`Received JSON:\n${message}`);

        const amqpService = new AMQPService();
        await amqpService.connect();

        amqpService.publish(message);

        amqpService.close();

    } catch (error) {
        next(error);
    }
};


export {
    apiController
};