/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application } from 'express';
import cors from 'cors';
import { requestLog } from './shared/logger';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import path from 'path';
import cookieParser from 'cookie-parser';
// sock.io
import { createServer } from 'http';
import { Server } from 'socket.io';
// import router
import routes from './app/routes';
import corsOptions from './config/corsOptions';
const app: Application = express();
// socket.io
const server = createServer(app);
const io = new Server(server);
// io.on('connection', socket => {
//   console.log('a user connected');
// });
app.set('io', io);
// request log
app.use(requestLog);
// static public folder
app.use(express.static(path.join(process.cwd(), 'public')));
// using cors
// app.use(cors(corsOptions));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use(cookieParser());
// using parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application route
app.use('/api/v1', routes);
// handle global error
app.use(globalErrorHandler);
// handle not found route
app.use(notFoundHandler);

export default server;