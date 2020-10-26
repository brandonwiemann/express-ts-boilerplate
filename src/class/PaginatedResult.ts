import { IPaginatedResult, IPaginatedQuery } from '@/types/search.types';

export default class PaginatedResult<T> implements IPaginatedResult<T> {
    readonly total: number;
    readonly results: T[];
    readonly query: IPaginatedQuery;

    constructor(query: IPaginatedQuery, results: T[], total: number) {
        this.query = query;
        this.total = total;
        this.results = results;
    }
}
