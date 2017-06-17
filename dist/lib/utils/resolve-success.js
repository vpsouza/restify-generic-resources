'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (res, result) {
    return result ? res.send(200, Array.isArray(result) ? { length: result.length, result: result } : result) : res.send(200, {});
};