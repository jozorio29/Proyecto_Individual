import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI_MONGODB = process.env.MONGODB_URI;

const conectarDB = async () => {
    try {
        await mongoose.connect(URI_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default conectarDB;
