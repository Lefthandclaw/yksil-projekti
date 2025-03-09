import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import entryRouter from './routes/entry-router.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handler.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;


app.use(cors());

app.use('/', express.static('public'));
app.use(express.json());

app.use('/api', express.static('docs'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/entries', entryRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});