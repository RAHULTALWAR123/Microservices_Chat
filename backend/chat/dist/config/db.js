import mongoose, { mongo } from "mongoose";
const connectDB = async () => {
    const url = process.env.MONGO_URI;
    if (!url) {
        throw new Error("mongo uri not defined in env ");
    }
    try {
        await mongoose.connect(url, {
            dbName: "MicroChat",
        });
        console.log("connected to mongoDB");
    }
    catch (error) {
        console.error("failed to connect to mongodb", error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map