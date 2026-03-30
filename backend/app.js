import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cors({
  origin: "https://task-managements-blond.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import userRoutes from './routers/user.routes.js';
import taskRoutes from './routers/task.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

app.use('/tasks', taskRoutes);
app.use('/auth/user', userRoutes)

app.use(errorHandler);
// Routes
app.get('/', (req, res) => {
    console.log(req);
  res.send('Hello World!');
});

export { app };
