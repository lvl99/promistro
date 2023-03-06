/**
 * promistro v1.0.0 by Matt Scheurich <matt@lvl99.com> (License: Apache-2.0)
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function promistro(fn, options) {
    var _a = __assign({ wait: 100, leading: false, accumulate: false }, options), wait = _a.wait, leading = _a.leading, accumulate = _a.accumulate;
    var deferred;
    var timer;
    var allArgs = [];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var attempt = allArgs.push(args);
        if (!deferred) {
            // @ts-ignore
            deferred = {};
            deferred.promise = new Promise(function (resolve, reject) {
                deferred.resolve = resolve;
                deferred.reject = reject;
            });
        }
        else {
            clearTimeout(timer);
        }
        var execFn = function () {
            Promise.resolve(fn.apply(fn, accumulate ? [allArgs] : args)).then(deferred.resolve, deferred.reject);
        };
        if (leading && attempt === 1)
            execFn();
        timer = setTimeout(execFn, wait);
        return deferred.promise;
    };
}

exports.default = promistro;
exports.promistro = promistro;
