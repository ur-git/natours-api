import express from 'express';

const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.status(200).json({ message: 'hello' });
});

app.listen(port, () => {
  console.log('app runnin on port 3000');
});
