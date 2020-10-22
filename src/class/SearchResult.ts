import { ISearchResult, ISearchQuery } from '@/types/search.types';

export default class SearchResult<T> implements ISearchResult<T> {
    readonly total: number;
    readonly results: T[];
    readonly query: ISearchQuery

    constructor(query: ISearchQuery, results: T[], total: number) {
        this.query = query;
        this.total = total;
        this.results = results;
    }
}
