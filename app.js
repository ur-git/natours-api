import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

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

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. route handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  //   console.log(req.params);
  const id = Number(req.params.id);
  const tour = tours.find((x) => x.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
  //   console.log(req.body);
};

const updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour>',
    },
  });
};

const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {};
const getUser = (res, req) => {};
const createUser = (res, req) => {};
const updateUser = (res, req) => {};
const deleteUser = (res, req) => {};

// 3. routes
// good practice to specify api version like v1
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//create new router and save in a variable
const tourRouter = express.Router();
const userRouter = express.Router();

// '/' is root of this '/api/v1/tours' url
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// connect new router to our application by using it as a middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', tourRouter);

// 4. start server
app.listen(port, () => {
  console.log('app running');
});
