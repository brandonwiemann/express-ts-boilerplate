import { AnyObject } from '@/types/generic.types';
import { ILogger } from '@/types/log.types';
import pino from 'pino';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/types/inversify.types';

@injectable()
export default class AppLogger implements ILogger {

    @inject(TYPES.PinoLogger)
    private logger: pino.Logger;

    logInfo(info: string, metadata?: AnyObject): void {
        this.logger.info(metadata || {}, info);
    }

    logError(error: any): void {
        this.logger.error(error);
    }

    logWarning(warning: string, metadata?: AnyObject): void {
        this.logger.warn(metadata || {}, warning);
    }

    trace(error: any) {
        this.logger.trace(error);
    }

}
