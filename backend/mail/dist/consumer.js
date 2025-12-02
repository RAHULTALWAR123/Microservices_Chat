import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
export const startOtpConsumer = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_password
        });
        const channel = await connection.createChannel();
        const queueName = "send-otp";
        await channel.assertQueue(queueName, { durable: true });
        console.log("mail service consumer listening for otp emails");
        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const { to, subject, body } = JSON.parse(msg.content.toString());
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASSWORD,
                        }
                    });
                    await transporter.sendMail({
                        from: "MicroChat",
                        to,
                        subject,
                        text: body
                    });
                    console.log(`otp mail sent to ${to}`);
                    channel.ack(msg);
                }
                catch (error) {
                    console.log("failed to send otp ", error);
                }
            }
        });
    }
    catch (error) {
        console.log("failed to start rabbitmq comsumer ", error);
    }
};
//         USER
//           |
//           v
// +------------------+ 
// |   API Service    |
// | /send-otp route  |
// +------------------+
//           |
//           | publishToQueue("send-otp", otp details)
//           v
// +------------------+
// |   RabbitMQ       |
// |   send-otp Queue |
// +------------------+
//           |
//           | consumer reads message
//           v
// +----------------------------+
// |  Mail/OTP Service          |
// |  (startOtpConsumer)        |
// +----------------------------+
//           |
//           | sends email
//           v
//         MAILBOX
//# sourceMappingURL=consumer.js.map