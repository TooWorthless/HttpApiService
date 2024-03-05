import amqp from 'amqplib/callback_api.js';
import dotenv from 'dotenv';
dotenv.config();


amqp.connect(`amqp://${process.env.rabbitmq_username}:${process.env.rabbitmq_password}@127.0.0.1:5672`, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'Test queue 1';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log('[*] Waiting for messages in %s. To exit press CTRL+C', queue);

        channel.consume(queue, function(msg) {
            console.log('[x] Received %s', msg.content.toString());
        }, {
            noAck: true
        });
    });
});