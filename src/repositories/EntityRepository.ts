import { Repository, EntitySchema, FindManyOptions, FindOneOptions, getConnection, DeepPartial } from 'typeorm';
import { IPaginatedQuery, IPaginatedResult } from '@/types/search.types';
import PaginatedResult from '@/class/PaginatedResult';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { createFindManyPaginatedQueryOptions } from '@/utils/search.utils';
import { IBaseEntity } from '@/types/entity.types';
import { injectable, unmanaged } from 'inversify';

@injectable()
export default class EntityRepository<T extends IBaseEntity> implements IEntityRepository<T>  {

    protected readonly repo: Repository<T>;

    constructor(@unmanaged() modelClass: IBaseEntity) {
        this.repo = getConnection().getRepository(modelClass as EntitySchema<T>);
    }

    public get(id: number | string): Promise<T> {
        return this.repo.findOne(id);
    }

    public find(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repo.find(options);
    }

    public findOne(options: FindOneOptions<T>): Promise<T> {
        return this.repo.findOne(options);
    }

    public async findPaginated(query: IPaginatedQuery, options: FindManyOptions<T>)
    : Promise<IPaginatedResult<T>>
    {
        options = createFindManyPaginatedQueryOptions(query, options);
        const result = await this.repo.findAndCount(options);
        return new PaginatedResult<T>(query, result[0], result[1]);
    }

    public save(model: DeepPartial<T>): Promise<T> {
        return this.repo.save(model);
    }

    public async update(id: number, model: QueryDeepPartialEntity<T>): Promise<boolean> {
        const result = await this.repo.update(id, model);
        return result.affected >= 1;
    }

    public async delete(id: number) {
        if(typeof id !== 'number') {
            throw 'Invalid entity ID specified for delete';
        }
        else {
            const result = await this.repo.delete(id);
            return(result.affected >= 1)
        }
    }

}

export interface IEntityRepository<T> {
    get(id: number | string): Promise<T>
    find(options?: FindManyOptions<T>): Promise<T[]>
    findOne(options: FindOneOptions<T>): Promise<T>
    findPaginated(query: IPaginatedQuery, options: FindManyOptions<T>): Promise<IPaginatedResult<T>>
    save(model: T): Promise<T>
    update(id: number, model: QueryDeepPartialEntity<T>): Promise<boolean>
    delete(id: number): Promise<boolean>
}
