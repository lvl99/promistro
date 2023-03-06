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

export function promistro<T = any>(fn: DebouncedPromise<T>, options?: Config) {
  const { wait, leading, accumulate } = {
    wait: 100,
    leading: false,
    accumulate: false,
    ...options,
  } as Config;
  let deferred: DeferredPromise<T>;
  let timer: NodeJS.Timeout | number;
  const allArgs: any[][] = [];

  return function (...args: any[]) {
    const attempt = allArgs.push(args);

    if (!deferred) {
      // @ts-ignore
      deferred = {};
      deferred.promise = new Promise<T>((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
      });
    } else {
      clearTimeout(timer);
    }

    var execFn = () => {
      Promise.resolve(fn.apply(fn, accumulate ? [allArgs] : args)).then(
        deferred.resolve,
        deferred.reject
      );
    };

    if (leading && attempt === 1) execFn();

    timer = setTimeout(execFn, wait);

    return deferred.promise;
  };
}

export default promistro;
