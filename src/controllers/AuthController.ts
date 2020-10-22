import BaseController from './BaseController';
import { Request, Response } from 'express';
import { IAuthorizedRequest } from '@/types/requests.types'
import { bind } from 'bind-decorator';
import { AuthHelper } from '@/helpers/auth.helper';
import { IUserEntityService } from '@/services/UserEntityService';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/types/inversify.types';
import { jsonCopy } from '@/utils/json.utils';
import User from '@/data/entity/User';

@injectable()
export default class AuthController extends BaseController {

    @inject(TYPES.IUserEntityService)
    private readonly _userService: IUserEntityService;

    @bind
    public async createAccount(req: Request, res: Response) {
	    try {
	        const user = await this._userService.createUser(req.body);
	        if(user.password) delete user.password;
	        AuthHelper.createJWT(user, (err, token) => {
	            const success = !err;
	            res.json({ success, token, user });
	        });
	    } catch(e) {
	        this.handleError(e, res);
	    }
    }

    @bind
    public async login(req: IAuthorizedRequest, res: Response) {
	    try {
	        if(!req.user) {
	            return this.badRequest('Login failed', res);
	        }
	        const user = jsonCopy<User>(req.user);
	        AuthHelper.createJWT(user, (err, token) => {
	            if(err) this.handleError(err, res);
	            if(user.password) delete user.password;
	            res.cookie('jwt', token, {
	                httpOnly: true,
	                signed: true,
	                secure: process.env.NODE_ENV === 'production',
	                maxAge: 3600000
	            });
	            res.json({
	                success: true,
	                user
	            });
	        });
	    } catch(e) {
	        this.handleError(e, res);
	    }
    }

    @bind
    public async logout(_req: IAuthorizedRequest, res: Response) {
        res.clearCookie('jwt');
        res.json(true);
    }

    @bind
    public async validateJWTToken(req: IAuthorizedRequest, res: Response) {
        try {
            if(!req.user) {
                return this.badRequest('Invalid JWT', res);
            }
            return res.json(req.user);
        } catch(e) {
            this.handleError(e, res);
        }
    }

}
