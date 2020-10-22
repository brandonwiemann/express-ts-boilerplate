import { IBaseEntity } from '@/types/entity.types';
import { injectable } from 'inversify';
import { EntitySchema, getConnection, Repository } from 'typeorm';

@injectable()
export default class RepositoryFactory implements IRepositoryFactory {

    public create<T>(modelClass: IBaseEntity): Repository<T> {
        return getConnection().getRepository(modelClass as EntitySchema<T>);
    }

}

export interface IRepositoryFactory {
    create<T>(modelClass: IBaseEntity): Repository<T>;
}