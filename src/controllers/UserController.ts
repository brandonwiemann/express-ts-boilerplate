import User from '@/data/entity/User';
import { IUserEntityService } from '@/services/UserEntityService';
import { TYPES } from '@/types/inversify.types';
import { inject, injectable } from 'inversify';
import BaseRestController from './BaseRestController';

@injectable()
export default class UserController extends BaseRestController<User> {

    constructor(@inject(TYPES.IUserEntityService) service: IUserEntityService) {
        super(service);
    }

}