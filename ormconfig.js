const baseDir = 'src/data';
const entitiesDir = baseDir + 'entities';
const factoriesDir = baseDir + 'factories';
const migrationsDir = baseDir + 'migrations';
const seedsDir = baseDir + 'seeds';

module.exports = {
    type: 'mysql',
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    synchronize: process.env !== 'production',
    entities: [`${entitiesDir}/**/*.ts`],
    seeds: [`${seedsDir}/**/*.ts`],
    factories: [`${factoriesDir}/**/*.ts`],
    migrationsTableName: 'db_migrations',
    migrations: [`${migrationsDir}/*.ts`],
    cli: {
        entitiesDir,
        factoriesDir,
        migrationsDir,
        seedsDir
    }
};
