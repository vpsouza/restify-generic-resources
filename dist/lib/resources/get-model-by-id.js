'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _easyutils = require('easyutils');

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (appAuthSecret, server, modelName, models, logger) {
    return function (req, res) {
        if (req.params && req.params.id) {
            [(0, _easyutils.getTenant)(appAuthSecret), (0, _services.getModelById)(server, modelName, models)].reduce(function (chain, task) {
                return chain.then(task);
            }, Promise.resolve([req.params.jwt, req.params.id])).then(function (result) {
                return (0, _easyutils.resolveSuccess)(res, result);
            }).catch(function (err) {
                return (0, _easyutils.resolveError)(res, new _restify2.default.InternalServerError(err), logger);
            });
        } else {
            (0, _easyutils.resolveError)(res, new _restify2.default.BadRequestError('Invalid Request Body'), null);
        }
    };
};