import dotenv from "dotenv";
import express from "express";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

export default app;
