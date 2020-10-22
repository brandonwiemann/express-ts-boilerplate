/**
 * Immutably copies a value using JSON
 * @param val The value to copy
 */
export function jsonCopy<T>(val: any): T {
    return JSON.parse(JSON.stringify(val)) as T;
}
