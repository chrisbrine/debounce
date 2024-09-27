"use strict";
/*
 ** @debounce((delay: number, data: any)
 ** function to run
 **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttling = throttling;
const utils_1 = require("../utils");
const ThrottleDelays = new Map();
const ThrottleResults = new Map();
const ThrottleDefaults = {
    delay: 2000,
    name: "cached",
};
function throttling(params, fn) {
    const options = Object.assign(Object.assign({}, ThrottleDefaults), (typeof params === "number"
        ? { delay: params }
        : typeof params === "string"
            ? { name: params }
            : params));
    options.fn = fn || options.fn;
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            if (!ThrottleDelays.has(options.name) ||
                !ThrottleResults.has(options.name)) {
                const data = original.apply(this, args);
                (0, utils_1.handleFn)(options, data, (data) => {
                    ThrottleResults.set(options.name, data);
                });
                ThrottleDelays.set(options.name, setTimeout(() => {
                    ThrottleDelays.delete(options.name);
                    ThrottleResults.delete(options.name);
                }, options.delay));
            }
            else {
                (0, utils_1.handleFn)(options, ThrottleResults.get(options.name));
            }
        };
        return descriptor;
    };
}
