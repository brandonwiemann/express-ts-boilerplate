require('dotenv').config();
import 'reflect-metadata';
import AppLogger from '@/log/AppLogger';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsConfig from './config/cors.config';
import express from 'express';
import expressPino from 'express-pino-logger';
import { createConnection } from 'typeorm';
import './auth';

const app = express();
const appLogger = new AppLogger();
const port = process.env.EXPRESS_PORT;

appLogger.logInfo('Establishing database connection...');
createConnection().then(async () => {
    app.use(cors(corsConfig));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressPino({ logger: appLogger.logger }));
    app.use('/', require('./routes'));
    appLogger.logInfo('Database connected, starting express server...');
    app.listen(port, () => appLogger.logInfo(`Express is listening on port ${port}`));
});
