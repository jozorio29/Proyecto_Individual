import express from "express";
import cors from "cors";
import router from "./routes/pizzeria.routes.js";
import conectarDB from "./config/pizzeria.config.js";

const app = express();
const PORT = process.env.PORT || 8000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// Conectar a MongoDB
conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})