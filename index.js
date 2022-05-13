import express from 'express';
import bodyParser from 'body-parser';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import logoutRoutes from './routes/logout.js';
import userRoutes from './routes/users.js';
import { loadDb } from './controllers/user_roles.js';
import cookieParser from 'cookie-parser';

const app = express();

const port = 3000;

app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.json());

app.use(loadDb);

app.use('/register', registerRoutes);

app.use('/login', loginRoutes);

app.use('/logout', logoutRoutes);

app.use('/users', userRoutes);

app.get('/', (req, res) => res.send('Email Api'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
