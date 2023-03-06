export type DebouncedPromise<T = any> = (...args: any[]) => T | PromiseLike<T>;
export interface DeferredPromise<T = any> {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}
export interface Config {
    wait?: number;
    accumulate?: boolean;
    leading?: boolean;
}
export declare function promistro<T = any>(fn: DebouncedPromise<T>, options?: Config): (...args: any[]) => Promise<T>;
export default promistro;
