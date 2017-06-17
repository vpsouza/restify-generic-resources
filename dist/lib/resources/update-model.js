'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _utils = require('./utils');

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (appAuthSecret, server, modelName, models, logger) {
    return function (req, res) {
        if (req.body && req.body.id) {
            [(0, _utils.getTenant)(appAuthSecret), (0, _services.getModelById)(server, modelName, models), _services.updateModel, _services.updateModelIncluded].reduce(function (chain, task) {
                return chain.then(task);
            }, Promise.resolve([req.params.jwt, req.body.id, req.body])).then(function (result) {
                return (0, _utils.resolveSuccess)(res, result);
            }).catch(function (err) {
                return (0, _utils.resolveError)(res, new _restify2.default.InternalServerError(err.message), logger);
            });
        } else {
            (0, _utils.resolveError)(res, new _restify2.default.BadRequestError('Invalid Request Body'), null);
        }
    };
};