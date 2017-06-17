'use strict';

var _getModelInstance = require('./get-model-instance');

var _getModelInstance2 = _interopRequireDefault(_getModelInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = {
    Customer: {},
    Employee: {},
    invalidModel: {}
};

test('find an existing sequelize model instance', function () {
    ['customer', 'employee'].forEach(function (modelName) {
        return expect((0, _getModelInstance2.default)(models, modelName)).toBeDefined();
    });
});

test('find a non-existing sequelize model instance', function () {
    ['product', 'agenda', 'invalidModel'].forEach(function (modelName) {
        return expect((0, _getModelInstance2.default)(models, modelName)).not.toBeDefined();
    });
});