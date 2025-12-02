import amqp from "amqplib";
let channel;
export const connectRabitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_password
        });
        channel = await connection.createChannel();
        console.log("connected to rabbitmq ");
    }
    catch (error) {
        console.log("failed to connect ", error);
    }
};
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("rabbitmq channel is not found");
        return;
    }
    // If the queue doesn't exist, RabbitMQ creates it.
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
};
//# sourceMappingURL=rabbitmq.js.map