import { ISearchQuery, ISearchResult } from '@/types/search.types';
import { IEntityService } from '@/types/entity.types';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { inject, injectable, unmanaged } from 'inversify';
import { IRepositoryFactory } from '@/factories/RepositoryFactory';
import { TYPES } from '@/types/inversify.types';
import { createFindManySearchQueryOptions } from '@/utils/search.utils';
import SearchResult from '@/class/SearchResult';
import { IRedisService } from './RedisService';

@injectable()
export default abstract class BaseEntityService<T> implements IEntityService<T> {

    @inject(TYPES.IRedisService)
    protected redisService: IRedisService;

    protected repo: Repository<T>;

    constructor(
    @unmanaged()
		    modelClass: (new () => T),
        @inject(TYPES.IRepositoryFactory)
		    factory: IRepositoryFactory
    ) {
	    this.repo = factory.create(modelClass);
    }

    public get(id: number | string): Promise<T> {
	    return this.repo.findOne(id);
    }

    public getAll(): Promise<T[]> {
	    return this.repo.find();
    }

    public find(options: FindManyOptions<T>): Promise<T[]> {
	    return this.repo.find(options);
    }

    public async search(query: ISearchQuery): Promise<ISearchResult<T>> {
	    const options = createFindManySearchQueryOptions(query);
	    const result = await this.repo.findAndCount(options);
	    return new SearchResult<T>(query, result[0], result[1]);
    }

    public save(model: DeepPartial<T>) {
	    return this.repo.save(model);
    }

    public async delete(id: number): Promise<boolean> {
	    const result = await this.repo.delete(id);
	    return(result.affected >= 1);
    }
}