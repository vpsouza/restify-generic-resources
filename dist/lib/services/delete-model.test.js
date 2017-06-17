'use strict';

var _deleteModel = require('./delete-model');

var _deleteModel2 = _interopRequireDefault(_deleteModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _sequelizeModelInstance = null;

beforeEach(function () {
    _sequelizeModelInstance = {
        destroy: jest.fn(function () {
            return Promise.resolve(1);
        })
    };
});

var _modelName = 'myModel';

test('Testing delete service passing a sequelize model instance', function () {
    return (0, _deleteModel2.default)(_modelName)([_sequelizeModelInstance]).then(function (result) {
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(1);
        expect(_sequelizeModelInstance.destroy.mock.calls.length).toBe(1);
        expect(_sequelizeModelInstance.destroy.mock.calls[0].length).toBe(0);
    });
});

test('Testing delete service passing a sequelize model instance and other values', function () {
    var arrayOfOtherValues = [12, { id: 2 }, 'test'];
    return (0, _deleteModel2.default)(_modelName)([_sequelizeModelInstance].concat(arrayOfOtherValues)).then(function (result) {
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(4);
        expect(result[0]).toBe(1);
        expect(result.some(function (r) {
            return arrayOfOtherValues.includes(r);
        })).toBe(true);
        expect(_sequelizeModelInstance.destroy.mock.calls.length).toBe(1);
        expect(_sequelizeModelInstance.destroy.mock.calls[0].length).toBe(0);
    });
});

test('Testing delete service without a sequelize model instance', function () {
    return (0, _deleteModel2.default)(_modelName)([null]).catch(function (err) {
        expect(err).toBeDefined();
        expect(err).toHaveProperty('msg', _modelName + ' record not found');
        expect(_sequelizeModelInstance.destroy.mock.calls.length).toBe(0);
    });
});