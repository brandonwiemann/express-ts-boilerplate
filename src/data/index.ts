import { createConnection, Connection } from 'typeorm';
import AppLogger from '@/log/AppLogger';
import { inject } from 'inversify';
import { TYPES } from '@/types/inversify.types';

class DB {

    @inject(TYPES.ILogger)
    private readonly _logger: AppLogger;

    public connection: Connection;

    public connect() {
	    if(this.connection) return;
	    this._logger.logInfo('Establishing database connection...');
	    return new Promise((resolve, reject) => {
	        createConnection().then(connection => {
	            this.connection = connection;
	            this._logger.logInfo('Database connected');
	            resolve();
	        }).catch(error => {
	            this._logger.logInfo('Database connection error', error);
	            reject(error);
	        });
	    });
    }

}

export default new DB();
