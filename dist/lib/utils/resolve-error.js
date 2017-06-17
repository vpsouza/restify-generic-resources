'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (res, body, logger) {
    if (logger) {
        logger.error(body);
    }
    res.send(body);
};