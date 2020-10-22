import { Container } from 'inversify';
import AppLogger from '@/log/AppLogger';
import UserEntityService, { IUserEntityService } from '@/services/UserEntityService';
import { ILogger } from '@/types/log.types';
import UserController from '@/controllers/UserController';
import BaseController, { IController } from '@/controllers/BaseController';
import AuthController from '@/controllers/AuthController';
import { TYPES } from '@/types/inversify.types';
import RepositoryFactory, { IRepositoryFactory } from '@/factories/RepositoryFactory';
import RedisService, { IRedisService } from '@/services/RedisService';
import { IEntityRepository } from '@/types/entity.types';
import EntityRepository from '@/repositories/EntityRepository';
import redis, { RedisClient } from 'redis';

const container = new Container();

/* Classes
============================================*/

container.bind<IController>(TYPES.IController).to(BaseController);
container.bind<ILogger>(TYPES.ILogger).to(AppLogger);
container.bind<UserController>(TYPES.IUserController).to(UserController);
container.bind<IUserEntityService>(TYPES.IUserEntityService).to(UserEntityService);
container.bind<AuthController>(TYPES.IAuthController).to(AuthController);
container.bind<IRedisService>(TYPES.IRedisService).to(RedisService).inRequestScope();
container.bind<RedisClient>(TYPES.RedisClient).toConstantValue(redis.createClient());
container.bind<IEntityRepository<any>>(TYPES.IEntityRepository).to(EntityRepository);

/* Factories
============================================*/

container.bind<IRepositoryFactory>(TYPES.IRepositoryFactory).toConstantValue(new RepositoryFactory());


export default container;