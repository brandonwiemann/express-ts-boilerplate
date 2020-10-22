const path = require('path');

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: process.env.SQL_PORT,
    username: 'root',
    password: 'express-ts-sql',
    database: 'express-ts-sql',
    entities: [
        path.join(__dirname, 'src/data/entity/*.ts')
    ],
    synchronize: true,
    seeds: ['src/data/seeds/**/*.ts'],
    factories: ['src/data/factories/**/*.ts']
};
