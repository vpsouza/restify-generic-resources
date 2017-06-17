'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupAPI = exports.resources = exports.services = undefined;

var _services = require('./lib/services');

var services = _interopRequireWildcard(_services);

var _resources = require('./lib/resources');

var resources = _interopRequireWildcard(_resources);

var _restifySequelizeValidation = require('restify-sequelize-validation');

var _restifySequelizeValidation2 = _interopRequireDefault(_restifySequelizeValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var setupAPI = function setupAPI(appAuthSecret, server, modelName, models, logger) {
    server.get(modelName + '/:id', resources.getModelById(server, modelName, models, logger));
    server.put(modelName, (0, _restifySequelizeValidation2.default)(server, modelName, models), resources.createModel(server, modelName, models, logger));
    server.post(modelName, (0, _restifySequelizeValidation2.default)(server, modelName, models), resources.updateModel(server, modelName, models, logger));
    server.get(modelName, resources.listAll(server, modelName, models, logger));
    server.post(modelName, resources.listAll(server, modelName, models, logger));
    server.del(modelName + '/:id', resources.deleteModel(server, modelName, models, logger));
};

exports.services = services;
exports.resources = resources;
exports.setupAPI = setupAPI;