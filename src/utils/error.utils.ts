/**
 * Returns an error message for an unknown error type
 * @param error The error
 */
export function getErrorMessage(error: any): string {
    if(typeof error === 'string') return error;
    if(typeof error !== 'object' || !error.message) {
        return `An unknown error occurred. ${error.toString()}`;
    }
    return error.message;
}
