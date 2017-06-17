'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _utils = require('../utils');

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server, modelName, models, logger) {
    return function (req, res) {
        return [(0, _utils.getTenant)(process.env.AUTH_SECRET), (0, _services.listAll)(server, modelName, models)].reduce(function (chain, task) {
            return chain.then(task);
        }, Promise.resolve([req.params.jwt, req.body])).then(function (result) {
            return (0, _utils.resolveSuccess)(res, result);
        }).catch(function (err) {
            return (0, _utils.resolveError)(res, new _restify2.default.InternalServerError(err.message), logger);
        });
    };
};