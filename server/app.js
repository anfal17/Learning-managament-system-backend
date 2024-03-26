import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js"
import errorMiddleware from "./middlewares/error.middleware.js";

config();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials:true
}))
app.use(cookieParser());
app.use(morgan('dev'))

app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use('/api/v1/user', userRoutes)

//For all other routes then the defined ones
app.all("*", (req, res) => {
  res.send("404 rout not found");
});

app.use(errorMiddleware)

export default app;
