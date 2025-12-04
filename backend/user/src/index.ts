import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {createClient} from "redis";
import userRoutes from "./routes/user.js"
import { connectRabitMQ } from "./config/rabbitmq.js";
import cors from "cors";

dotenv.config();

connectDB();

connectRabitMQ();

export const redisClient = createClient({
    url : process.env.REDIS_URL as string,
})

redisClient.connect()
.then(() => console.log("connected to redis"))
.catch(console.error);


const app = express();

app.use(express.json());

app.use(cors())

const PORT = process.env.PORT || 5000;

app.use("/api/v1",userRoutes);


app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})   