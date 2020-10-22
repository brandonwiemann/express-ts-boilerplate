import express, { Router } from 'express';
import { IBaseEntity } from '@/types/entity.types';
import { IRestController } from '@/controllers/BaseRestController';

export default class RouterHelper {

    static createRestRouter<T extends IBaseEntity>(
        controller: IRestController<T>,
        baseRoute: string,
        middleware: (...args: any) => any = null,
    ) {
        const router = express.Router();
        this.addRestRoutes(controller, baseRoute, router, middleware);
        return router;
    }

    static addRestRoutes<T extends IBaseEntity>(
        controller: IRestController<T>,
        baseRoute: string,
        router: Router,
        middleware: (...args: any) => any = null
    ) {
        if(!middleware) middleware = (_a,_b,next) => { next(); }
        router.get(baseRoute + '/', middleware, controller.get);
        router.get(baseRoute + '/:id', middleware, controller.getOne);
        router.post(baseRoute + '/', middleware, controller.post);
        router.put(baseRoute + '/:id', middleware, controller.put);
        router.patch(baseRoute + '/:id', middleware, controller.patch);
        router.delete(baseRoute + '/:id', middleware, controller.delete);
    }
}
