import express from 'express';
import userRoutes from './modules/user/user.routes';
const app = express();
app.use(express.json());

// Register user routes
app.use('/api/users', userRoutes);    

//Register task routes
import taskRoutes from './modules/task/task.routes';
app.use('/api/tasks', taskRoutes);


export default app;