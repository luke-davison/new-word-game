import bodyParser from 'body-parser';
import express from 'express';

import router from './routes';

const port = 3001;

const app = express();
app.use(bodyParser.json())
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});