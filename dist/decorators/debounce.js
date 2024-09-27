"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
const utils_1 = require("../utils");
const Debounces = new Map();
const DebounceFns = new Map();
const DebounceDefaults = {
    delay: 500,
    name: "debounce",
    chaining: false,
};
function debounce(params, fn) {
    const options = Object.assign(Object.assign({}, DebounceDefaults), (typeof params === "number"
        ? { delay: params }
        : typeof params === "string"
            ? { name: params }
            : params));
    options.fn = fn || options.fn;
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            if (Debounces.has(options.name)) {
                clearTimeout(Debounces.get(options.name));
            }
            if (options.chaining && options.fn && typeof options.fn === "function") {
                const fns = DebounceFns.get(options.name) || [];
                DebounceFns.set(options.name, [
                    ...fns,
                    options.fn,
                ]);
            }
            Debounces.set(options.name, setTimeout(() => {
                Debounces.delete(options.name);
                const data = original.apply(this, args);
                if (options.chaining) {
                    const fns = DebounceFns.get(options.name) || [];
                    fns.forEach((fn) => (0, utils_1.handleFn)(Object.assign(Object.assign({}, options), { fn }), data));
                }
                else {
                    (0, utils_1.handleFn)(options, data);
                }
            }, options.delay));
        };
        return descriptor;
    };
}
