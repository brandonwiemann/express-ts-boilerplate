export interface ILogger {
    logInfo(info: string, metadata?: any): void;
    logError(error: Error | string, metadata?: any): void;
    logWarning(warning: string, metadata?: any): void;
}
