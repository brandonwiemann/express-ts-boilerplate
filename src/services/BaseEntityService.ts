import { IPaginatedQuery, IPaginatedResult } from '@/types/search.types';
import { IEntityService } from '@/types/entity.types';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { inject, injectable, unmanaged } from 'inversify';
import { IRepositoryFactory } from '@/factories/RepositoryFactory';
import { TYPES } from '@/types/inversify.types';
import { createFindManyPaginatedQueryOptions } from '@/utils/search.utils';
import PaginatedResult from '@/class/PaginatedResult';
import { IRedisService } from './RedisService';

@injectable()
export default abstract class BaseEntityService<T> implements IEntityService<T> {

    @inject(TYPES.IRedisService)
    protected redisService: IRedisService;

    protected repo: Repository<T>;

    constructor(
        @unmanaged() modelClass: (new () => T),
        @inject(TYPES.IRepositoryFactory) factory: IRepositoryFactory
    ) {
	    this.repo = factory.create(modelClass);
    }

    /**
     * Gets a single entity by id
     * @param id The entity id
     */
    public get(id: number | string): Promise<T> {
	    return this.repo.findOne(id);
    }

    /**
     * Gets all entities in a table
     */
    public getAll(): Promise<T[]> {
	    return this.repo.find();
    }

    /**
     * Finds entities that match given options
     * @param options
     */
    public find(options: FindManyOptions<T>): Promise<T[]> {
	    return this.repo.find(options);
    }

    /**
     * Gets a paginated result of entities that match given options
     * @param query
     */
    public async findPaginated(query: IPaginatedQuery, options?: FindManyOptions<T>): Promise<IPaginatedResult<T>> {
	    options = createFindManyPaginatedQueryOptions(query);
	    const result = await this.repo.findAndCount(options);
	    return new PaginatedResult<T>(query, result[0], result[1]);
    }

    /**
     * Saves a given entity in the database. If entity does not exist in the database then inserts, otherwise updates.
     * @param entity - The entity to save
     */
    public save(entity: DeepPartial<T>) {
	    return this.repo.save(entity);
    }

    /**
     * Deletes an entity by a given id
     * @param id
     */
    public async delete(id: number): Promise<boolean> {
	    const result = await this.repo.delete(id);
	    return(result.affected >= 1);
    }
}