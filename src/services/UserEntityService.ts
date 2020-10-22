import User from '@/data/entity/User';
import BaseEntityService from './BaseEntityService';
import EncryptionHelper from '@/helpers/encryption.helper';
import { IEntityService } from '@/types/entity.types';
import { inject, injectable } from 'inversify';
import { IRepositoryFactory } from '@/factories/RepositoryFactory';
import { TYPES } from '@/types/inversify.types';

@injectable()
export default class UserEntityService extends BaseEntityService<User> implements IUserEntityService {

    constructor(@inject(TYPES.IRepositoryFactory) factory: IRepositoryFactory) {
        super(User, factory);
    }

    /**
     * Authenticates a user
     * @param {string} email The user's email
     * @param {string} password The user's (unhashed) password
     */
    async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await this.repo.findOne({ where: { email }})
        if(!user) return null;
        const validPassword = await EncryptionHelper.compareHash(password, user.password);
        return validPassword ? user : null;
    }

    /**
     * Creates a new user
     * @param {User} newUser - The user info provided from create account form
     */
    async createUser(newUser: User): Promise<User> {
        const user = await this.repo.findOne({ where: { email: newUser.email }});
        if(user) {
            const validPassword = await EncryptionHelper.compareHash(newUser.password, user.password);
            if(validPassword) return newUser;
            throw 'User already exists with email: ' + newUser.email;
        }
        newUser.password = await EncryptionHelper.hash(newUser.password);
        await this.repo.save(newUser);
        return await this.repo.findOne({ where: { email: newUser.email }});
    }

}

export interface IUserEntityService extends IEntityService<User> {
    authenticateUser(email: string, password: string): Promise<User | null>;
    createUser(newUser: User): Promise<User>;
}
