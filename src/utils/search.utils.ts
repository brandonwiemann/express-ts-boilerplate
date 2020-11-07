import { IPaginatedQuery } from '@/types/search.types';
import { FindManyOptions } from 'typeorm';

export function createFindManyPaginatedQueryOptions(query: IPaginatedQuery, options?: FindManyOptions) {
    const skip = query.perPage * (query.page - 1);
    const take = query.perPage;
    options = options ? { ...options, skip, take } : { skip, take };
    if(query.orderColumn) {
        options.order = {};
        options.order[query.orderColumn] = query.descending ? 'DESC' : 'ASC';
    }
    return options;
}