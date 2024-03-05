import amqp from 'amqplib/callback_api.js';


const apiController = {};


apiController.postJson = (req, res, next) => {
    try {
        console.log('req.body :>> ', req.body);
        res.status(200).send(`Received JSON:\n${JSON.stringify(req.body)}`);

        amqp.connect(
            `amqp://${process.env.rabbitmq_username}:${process.env.rabbitmq_password}@127.0.0.1:5672`,
            (error0, connection) => {
                if (error0) {
                    throw error0;
                }

                connection.createChannel((error1, channel) => {
                    if (error1) {
                        throw error1;
                    }
                    var queue = 'Test queue 1';
                    var msg = JSON.stringify(req.body);

                    channel.assertQueue(queue, {
                        durable: false
                    });

                    channel.sendToQueue(queue, Buffer.from(msg));
                    console.log('[x] Sent %s', msg);
                });

                setTimeout(() => {
                    connection.close();
                }, 1000);
            }
        );

        // throw new Error('Test Error');
    } catch (error) {
        next(error);
    }
};


export {
    apiController
};