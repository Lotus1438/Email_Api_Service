import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes)

app.get('/', (req, res) => res.send('Email Api'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
