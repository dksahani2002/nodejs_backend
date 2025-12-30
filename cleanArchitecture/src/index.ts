import "dotenv/config";
import app from './app';
import  connectDB  from './config/dbconfig';
import { agenda } from './infrastructure/scheduler/agenda';
import { registerTaskJobHandlers } from './infrastructure/scheduler/taskJobHandlers';
import { MongoTaskRepository } from './infrastructure/db/repositories/MongoTaskRepository';
import { env } from "./config/env";

const PORT = env.port;

async function startServer() {
  await connectDB();
// Register job handlers
  const taskRepository = new MongoTaskRepository();
  registerTaskJobHandlers(taskRepository);    

  await agenda.start();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
