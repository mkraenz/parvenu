export function ObjectKeys<T>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}
