import express from 'express';
import bodyParser from 'body-parser';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
// import logoutRoutes from './routes/logout.js';
import userRoutes from './routes/users.js';

const app = express();

const port = 3000;


app.use(bodyParser.json());

app.use(express.json())

app.use('/register', registerRoutes);

app.use('/login', loginRoutes);

// app.use('/logout', logoutRoutes);

app.use('/users', userRoutes);

app.get('/', (req, res) => res.send('Email Api'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
