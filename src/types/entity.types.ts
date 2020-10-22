import { FindOneOptions, DeepPartial } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ISearchQuery, ISearchResult } from './search.types';

// Arbitrary interface for entity constraints
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBaseEntity {}

export interface IUserOwnedEntity extends IBaseEntity {
    userId: number;
}

export interface IEntityService<T extends IBaseEntity> {
    get(id: number | string): Promise<T>;
    getAll(): Promise<T[]>;
    find(options: FindManyOptions<T>);
    search(query: ISearchQuery): Promise<ISearchResult<T>>;
    save(model: DeepPartial<T>): Promise<T>;
    delete(id: number);
}

export interface IEntityRepository<T extends IBaseEntity> {
    get(id: number | string): Promise<T>;
    find(options?: FindManyOptions<T>): Promise<T[]>;
    findOne(options: FindOneOptions<T>): Promise<T>;
    findPaginated(query: ISearchQuery, options?: FindManyOptions<T>): Promise<ISearchResult<T>>;
    save(model: DeepPartial<T>): Promise<T>;
    update(id: number, model: QueryDeepPartialEntity<T>): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}
