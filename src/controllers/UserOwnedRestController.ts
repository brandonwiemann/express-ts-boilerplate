import bind from 'bind-decorator';
import { IAuthorizedRequest, IRestRequest } from '@/types/requests.types';
import { Response } from 'express';
import { IUserOwnedEntity } from '@/types/entity.types';
import { DeepPartial } from 'typeorm';
import { injectable } from 'inversify';
import BaseRestController from './BaseRestController';

@injectable()
export default class UserOwnedRestController<T extends IUserOwnedEntity> extends BaseRestController<T> {

    @bind
    public async get(req: IAuthorizedRequest, res: Response) {
        try {
            const result = await this.service.find({
                where: { userId: req.user.id }
            });
            res.json(result);
        } catch(err) {
            this.handleError(err, res);
        }
    }

    @bind
    public async getOne(req: IAuthorizedRequest, res: Response) {
        try {
            const id = Number(req.params?.id);
            if(!id || isNaN(id)) {
                return this.badRequest('Invalid ID', res);
            }
            const result = await this.service.get(id);
            if(!result) return this.notFound(res);
            if(result.userId !== req.user.id) return this.unauthorized(res);
            res.json(result);
        } catch(err) {
            this.handleError(err, res);
        }
    }

    @bind
    public async post(req: IRestRequest<T>, res: Response) {
        try {
            req.body.userId = req.user.id;
            const newEntity = await this.service.save(req.body as unknown as DeepPartial<T>);
            res.status(201).json(newEntity);
        } catch(err) {
            this.handleError(err, res);
        }
    }

    @bind
    public async put(req: IRestRequest<T>, res: Response) {
        try {
            const id = Number(req.params?.id);
            if(!id || isNaN(id)) {
                res.status(422).json('Invalid ID');
            }

            else if(req.body?.userId !== req.user.id) {
                this.unauthorized(res);
            }

            else {
            	await this.service.save(req.body as unknown as DeepPartial<T>);
                res.status(204).json(true);
            }
        } catch(err) {
            this.handleError(err, res);
        }
    }

    @bind
    public patch(req: IRestRequest<T>, res: Response) {
        this.put(req, res);
    }

    @bind
    public async delete(req: IAuthorizedRequest, res: Response) {
        try {
            const id = Number(req.params?.id);
            if(!id || isNaN(id)) {
                return res.status(422).json('Invalid ID');
            }

            const toDelete = await this.service.get(id);

            if(!toDelete) {
                return this.notFound(res);
            }

            if(toDelete.userId !== req.user.id) {
                return this.unauthorized(res);
            }

            const success = await this.service.delete(id)
            res.status(200).json(success);
        } catch(err) {
            this.handleError(err, res);
        }
    }
}
