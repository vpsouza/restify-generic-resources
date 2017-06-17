'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveError = exports.resolveSuccess = exports.getModelInstance = exports.getIncludedModels = exports.getTenant = undefined;

var _getTenant = require('./get-tenant');

var _getTenant2 = _interopRequireDefault(_getTenant);

var _getIncludedModels = require('./get-included-models');

var _getIncludedModels2 = _interopRequireDefault(_getIncludedModels);

var _getModelInstance = require('./get-model-instance');

var _getModelInstance2 = _interopRequireDefault(_getModelInstance);

var _resolveSuccess = require('./resolve-success');

var _resolveSuccess2 = _interopRequireDefault(_resolveSuccess);

var _resolveError = require('./resolve-error');

var _resolveError2 = _interopRequireDefault(_resolveError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getTenant = _getTenant2.default;
exports.getIncludedModels = _getIncludedModels2.default;
exports.getModelInstance = _getModelInstance2.default;
exports.resolveSuccess = _resolveSuccess2.default;
exports.resolveError = _resolveError2.default;