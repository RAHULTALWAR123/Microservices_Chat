import express from "express";
import dotenv from "dotenv";
import { startOtpConsumer } from "./consumer.js";

dotenv.config();

startOtpConsumer();




const app = express();
const PORT = process.env.PORT || 5001;



app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})   