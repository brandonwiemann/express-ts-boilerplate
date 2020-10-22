import { Request } from 'express';
import User from '@/data/entity/User';
import { IBaseEntity } from './entity.types';

export interface IAuthorizedRequest extends Request {
    user: User;
}

export interface IAuthRequest extends Request {
    body: Partial<User>;
    login(): void;
}

export interface IRestRequest<T extends IBaseEntity> extends IAuthorizedRequest {
    body: T;
    params: {
        id?: string;
    }
}