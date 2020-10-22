import { AnyObject } from '@/types/generic.types';
import { ILogger } from '@/types/log.types';
import pino from 'pino';
import config from '@/config/pino.config';
import { injectable } from 'inversify';

@injectable()
export default class AppLogger implements ILogger {

    logger: pino.Logger;

    constructor(logger: pino.Logger = pino(config)) {
        this.logger = logger;
    }

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
