export interface ISearchQuery {
    keyword: string;
    limit: number;
    page: number;
    orderColumn?: string;
    descending: boolean;
}

export interface ISearchResult<T> {
    total: number;
    results: T[];
}
