import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.js"

dotenv.config();

connectDB()




const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

app.use("/api/v1",chatRoutes);



app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})