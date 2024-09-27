"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFn = handleFn;
function handleFn(options, data, callback) {
    if (options.fn && typeof options.fn === "function") {
        if (data instanceof Promise) {
            data.then((res) => {
                options.fn && options.fn(res);
                callback && callback(res);
            });
        }
        else {
            options.fn(data);
            callback && callback(data);
        }
    }
}
