import amqp from 'amqplib/callback_api.js';


const apiController = {};


apiController.postJson = (req, res, next) => {
    try {
        const message = JSON.stringify(req.body);


        res.status(200).send(`Received JSON:\n${message}`);


        amqp.connect(
            `amqp://${process.env.rabbitmq_username}:${process.env.rabbitmq_password}@${process.env.IP}:${process.env.AMQP_PORT}`,
            (amqpConnectionError, connection) => {
                if (amqpConnectionError) {
                    throw amqpConnectionError;
                }

                connection.createChannel((creatingChannelError, channel) => {
                    if (creatingChannelError) {
                        throw creatingChannelError;
                    }

                    const exchange = 'messages';

                    channel.assertExchange(exchange, 'fanout', {
                        durable: false
                    });
                    channel.publish(exchange, '', Buffer.from(message));
                    console.log(" [x] Sent %s", message);
                });

                setTimeout(() => {
                    connection.close();
                }, 500);
            }
        );
    } catch (error) {
        next(error);
    }
};


export {
    apiController
};