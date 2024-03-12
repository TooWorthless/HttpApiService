import amqp from 'amqplib';


class AMQPService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }


    async connect() {
        try {
            this.connection = await amqp.connect(
                `amqp://${process.env.rabbitmq_username}:${process.env.rabbitmq_password}@${process.env.IP}:${process.env.AMQP_PORT}`
            );

            this.channel = await this.connection.createChannel();

            const exchange = 'messages';

            this.channel.assertExchange(exchange, 'fanout', {
                durable: false
            });
        } catch (error) {
            console.error('Error connecting to AMQP :>> ', error.stack);
            throw error;
        }
    }


    publish(message) {
        if(!this.channel) {
            throw new Error('Channel not initialized. Please call connect() first.');
        }

        this.channel.publish('messages', '', Buffer.from(message));
        console.log(" [x] Sent %s", message);
    }


    close() {
        if(this.connection) {
            setTimeout(() => {
                try {
                    this.connection.close();
                } catch (error) {
                    console.error('Error closing AMQP connection :>> ', error.stack);
                }
            }, 1000);
        }
    }
}


export {
    AMQPService
};
