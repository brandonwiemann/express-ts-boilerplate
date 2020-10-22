import { Response } from 'express';
import { getErrorMessage } from '@/utils/error.utils';
import { ILogger } from '@/types/log.types';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/types/inversify.types';

@injectable()
export default class BaseController implements IController {

    @inject(TYPES.ILogger)
    protected readonly logger: ILogger;

    handleError(error: any, res: Response) {
	    this.logger.logError(error);
	    res.status(500).send();
    }

    badRequest(publicError: any = '', res: Response) {
	    const errorMessage = getErrorMessage(publicError);
	    res.status(422).json({error: errorMessage});
    }

    unauthorized(res: Response) {
	    res.status(403).send();
    }

    notFound(res: Response) {
	    res.status(404).send();
    }

}

export interface IController {
    handleError(error: any, res: Response);
   	badRequest(publicError: any, res: Response);
    unauthorized(res: Response);
    notFound(res: Response);
}
