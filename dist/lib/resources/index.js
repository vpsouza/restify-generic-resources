'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateModel = exports.listAll = exports.getModelById = exports.deleteModel = exports.createModel = undefined;

var _createModel = require('./create-model');

var _createModel2 = _interopRequireDefault(_createModel);

var _deleteModel = require('./delete-model');

var _deleteModel2 = _interopRequireDefault(_deleteModel);

var _getModelById = require('./get-model-by-id');

var _getModelById2 = _interopRequireDefault(_getModelById);

var _listAllModels = require('./list-all-models');

var _listAllModels2 = _interopRequireDefault(_listAllModels);

var _updateModel = require('./update-model');

var _updateModel2 = _interopRequireDefault(_updateModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createModel = _createModel2.default;
exports.deleteModel = _deleteModel2.default;
exports.getModelById = _getModelById2.default;
exports.listAll = _listAllModels2.default;
exports.updateModel = _updateModel2.default;