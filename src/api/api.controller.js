

const apiController = {};


apiController.postDirectMessage = async (req, res, next) => {
    try {
        if(!req.body) throw new Error('Incorrect body');

        const data = req.body;

        res.status(200).send(`Received JSON:\n${JSON.stringify(data)}`);


        const savedMessage = await process.db.Message.create({
            message: data.message,
            receiver: data.receiverKey
        });


        const messageToPublish = JSON.stringify({
            message: data.message,
            receiverKey: data.receiverKey,
            timestamp: savedMessage.createdAt
        });


        process.amqpService.publish(messageToPublish, data.receiverKey);
        
    } catch (error) {
        next(error);
    }
};

apiController.postBroadcastMessage = async (req, res, next) => {
    try {
        if(!req.body) throw new Error('Incorrect body');

        const data = req.body;

        res.status(200).send(`Received JSON:\n${JSON.stringify(data)}`);


        const savedMessage = await process.db.Message.create({
            message: data.message
        });
        
        const messageToPublish = JSON.stringify({
            message: data.message,
            timestamp: savedMessage.createdAt
        });


        process.amqpService.publish(messageToPublish);

    } catch (error) {
        next(error);
    }
};


export {
    apiController
};