import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// route handlers
export const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};

export const getTour = (req, res) => {
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

export const createTour = (req, res) => {
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

export const updateTour = (req, res) => {
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

export const deleteTour = (req, res) => {
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