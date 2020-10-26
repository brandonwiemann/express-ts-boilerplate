export interface IPaginatedQuery {
    limit: number;
    page: number;
    orderColumn?: string;
    descending: boolean;
}

export interface ISearchQuery extends IPaginatedQuery {
    keyword: string;
}

export interface IPaginatedResult<T> {
    total: number;
    results: T[];
}
