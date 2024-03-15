import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();



class AMQPService {

    constructor() {
        this.connection = null;
        this.channel = null;
    }


    async connect() {
        try {
            const { rabbitmq_username, rabbitmq_password, IP, AMQP_PORT } = process.env;

            this.connection = await amqp.connect(
                `amqp://${rabbitmq_username}:${rabbitmq_password}@${IP}:${AMQP_PORT}`
            );
            this.channel = await this.connection.createChannel();

            const exchange = 'messages';
            this.channel.assertExchange(
                exchange, 
                'direct', 
                { durable: false }
            );
        } catch (error) {
            console.error('Error connecting to AMQP :>> ', error.stack);
            throw error;
        }
    }


    publish(message, key='forBroadcast') {
        if(!this.channel) {
            throw new Error('Channel not initialized. Please call connect() first.');
        }

        const exchange = 'messages';
        this.channel.publish(exchange, key, Buffer.from(message));
        console.log(' [x] Sent %s', message);
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



const amqpService = new AMQPService();
await amqpService.connect();



export {
    amqpService
};
