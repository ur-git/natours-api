import exp from 'constants';
import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

//middleware
app.use(express.json());

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// good practice to specify api version like v1
// (req,res) is route handler
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),(err)=>{
    res.status(201).send({
        status:'success',
        data:{
            tours:newTour
        }
    })
  })
  console.log(req.body);
//   res.send('done');
});

app.listen(port, () => {
  console.log('app running');
});
