import pino from 'pino';

const options: pino.LoggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.NODE_ENV === 'development'
}

export default options;