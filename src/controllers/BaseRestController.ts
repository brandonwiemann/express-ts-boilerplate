import BaseController, { IController } from './BaseController';
import bind from 'bind-decorator';
import { IAuthorizedRequest, IRestRequest } from '@/types/requests.types';
import { Response } from 'express';
import { IBaseEntity, IEntityService } from '@/types/entity.types';
import { injectable } from 'inversify';

@injectable()
export default abstract class BaseRestController<T extends IBaseEntity> extends BaseController implements IRestController<T> {

    protected service: IEntityService<T>;

    constructor(service: IEntityService<T>) {
	    super();
	    this.service = service;
    }

    @bind
    public async get(_req: IAuthorizedRequest, res: Response) {
	    try {
	        const result = await this.service.getAll();
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
            res.json(result);
        } catch(err) {
            this.handleError(err, res);
        }
    }

    @bind
    public async post(req: IRestRequest<T>, res: Response) {
        try {
            const newEntity = await this.service.save(req.body);
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
                return;
            }
            await this.service.save(req.body);
            res.status(204).json(true);
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

            const success = await this.service.delete(id)
            res.status(200).json(success);
        } catch(err) {
            this.handleError(err, res);
        }
    }
}

export interface IRestController<T> extends IController {
    get(req: IAuthorizedRequest, res: Response);
    getOne(req: IAuthorizedRequest, res: Response);
    post(req: IRestRequest<T>, res: Response);
    put(req: IRestRequest<T>, res: Response);
    patch(req: IRestRequest<T>, res: Response);
    delete(req: IAuthorizedRequest, res: Response);
}