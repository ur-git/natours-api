import express from 'express';
import morgan from 'morgan';
import  tourRouter from './routes/tourRoutes.js';
import  userRouter from './routes/userRoutes.js';

const app = express();
const port = 3000;

// 1. middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hi middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. routes

// connect new router to our application by using it as a middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4. start server
app.listen(port, () => {
  console.log('app running');
});
