import { TYPES } from '@/types/inversify.types';
import { ILogger } from '@/types/log.types';
import { inject, injectable } from 'inversify';
import { RedisClient } from 'redis';

@injectable()
export default class RedisService implements IRedisService {

    @inject(TYPES.RedisClient)
    private _client: RedisClient;

    @inject(TYPES.ILogger)
    private _logger: ILogger;

    /**
	 * Gets a value from Redis cache by key
	 * @param {string} key The redis key of the value to get
	 */
    public get<T>(key: string): Promise<T> {
	    return new Promise<T>((resolve, reject) => {
	        if(!this._client) resolve(null);
	        else {
	            this._client.get(key, (err, res) => {
	                if(err) reject(err);
	                else if(!res) resolve(null);
	                else {
	                    this._logger.logInfo(`Found redis entry for key: ${key}`);
	                    resolve(JSON.parse(res) as T);
	                }
	            });
	        }
	    });
    }

    /**
	 * Sets a value to redis cache by key
	 * @param {string} key - The key to set
	 * @param {string} value - The value to set
	 */
    public set(key: string, value: any): Promise<boolean> {
	    return new Promise((resolve, reject) => {
	        if(!this._client) resolve (false);
	        else {
	            this._client.set(key, JSON.stringify(value), (err, res) => {
	                this._logger.logInfo('Setting redis entry for key: ' + key);
	                if(err) reject(err);
	                else resolve(res === 'OK');
	            })
	        }
	    })
    }

}

export interface IRedisService {
    get<T>(key: string): Promise<T>;
    set(key: string, value: any): Promise<boolean>;
}