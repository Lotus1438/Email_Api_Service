import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import logoutRoutes from './routes/logout.js';
import userRoutes from './routes/users.js';
import messagesRoutes from './routes/messages.js';
import userRolesRoutes from './routes/user_roles.js'

const app = express();

const port = 3000;

app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.json());

app.use('/register', registerRoutes);

app.use('/login', loginRoutes);

app.use('/logout', logoutRoutes);

app.use('/users', userRoutes);

app.use('/messages', messagesRoutes);

app.use('/user_roles', userRolesRoutes);

// app.use('/users/filters', );

app.get('/', (req, res) => res.send('Email Api'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
