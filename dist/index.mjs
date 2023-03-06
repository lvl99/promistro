/**
 * promistro v1.0.0 by Matt Scheurich <matt@lvl99.com> (License: Apache-2.0)
 */
function promistro(fn, options) {
    const { wait, leading, accumulate } = {
        wait: 100,
        leading: false,
        accumulate: false,
        ...options,
    };
    let deferred;
    let timer;
    const allArgs = [];
    return function (...args) {
        const attempt = allArgs.push(args);
        if (!deferred) {
            // @ts-ignore
            deferred = {};
            deferred.promise = new Promise((resolve, reject) => {
                deferred.resolve = resolve;
                deferred.reject = reject;
            });
        }
        else {
            clearTimeout(timer);
        }
        var execFn = () => {
            Promise.resolve(fn.apply(fn, accumulate ? [allArgs] : args)).then(deferred.resolve, deferred.reject);
        };
        if (leading && attempt === 1)
            execFn();
        timer = setTimeout(execFn, wait);
        return deferred.promise;
    };
}

export { promistro as default, promistro };
