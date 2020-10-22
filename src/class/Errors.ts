export class CustomError extends Error {
    constructor(m?: string) {
        super(m);
        // https://stackoverflow.com/a/48342359
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class RepositoryError extends CustomError {}
export class ServiceError extends CustomError {}
