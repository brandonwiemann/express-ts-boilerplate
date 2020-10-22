const path = require('path');

module.exports = {
    type: 'mysql',
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    entities: [
        path.join(__dirname, 'src/data/entity/*.ts')
    ],
    synchronize: true,
    seeds: ['src/data/seeds/**/*.ts'],
    factories: ['src/data/factories/**/*.ts']
};
