'use strict';

var _createModel = require('./create-model');

var _createModel2 = _interopRequireDefault(_createModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createdSequelizeModelInstance = {
    id: '128963bdbw789wb238',
    foo: 'bar'
};

var _sequelizeModelInstance = {
    create: jest.fn(function () {
        return Promise.resolve(_createdSequelizeModelInstance);
    }),
    getRelations: function getRelations() {
        return {
            address: {
                accessors: {
                    create: "createAddress",
                    get: "getAddress",
                    set: "setAddress"
                },
                as: "address",
                associationType: "HasOne",
                foreignKey: "customerId",
                foreignKeyAttribute: {
                    identifierField: "customerId",
                    isSelfAssociation: false,
                    isSingleAssociation: true,
                    source: { //Model
                        name: "customer"
                    },
                    sourceIdentifier: "id",
                    sourceKey: "id",
                    sourceKeyIsPrimary: true,
                    target: { //Model
                        name: "address"
                    }
                },
                source: { //Model
                    name: "customer"
                },
                target: { //Model
                    name: "address"
                }
            },
            contacts: {
                accessors: {
                    create: "createContact",
                    get: "getContact",
                    set: "setContact"
                },
                as: "contact",
                associationType: "HasOne",
                foreignKey: "customerId",
                foreignKeyAttribute: {
                    identifierField: "customerId",
                    isSelfAssociation: false,
                    isSingleAssociation: true,
                    source: { //Model
                        name: "customer"
                    },
                    sourceIdentifier: "id",
                    sourceKey: "id",
                    sourceKeyIsPrimary: true,
                    target: { //Model
                        name: "contact"
                    }
                },
                source: { //Model
                    name: "customer"
                },
                target: { //Model
                    name: "contact"
                }
            }
        };
    }
};
var _models = function _models(server, tenantID) {
    return {
        'ModelName': _sequelizeModelInstance
    };
};
var strModelName = 'modelName';
var _modelBody = {
    contacts: [{ id: 1 }, { id: 2 }],
    address: [{ id: 1 }, { id: 2 }]
};

test('Testing create service', function () {
    return (0, _createModel2.default)(null, strModelName, _models)(['test', _modelBody]).then(function (inst) {
        expect(inst).toBe(_createdSequelizeModelInstance);
        expect(_sequelizeModelInstance.create.mock.calls.length).toBe(1);
        expect(_sequelizeModelInstance.create.mock.calls[0].length).toBe(2);
        expect(_sequelizeModelInstance.create.mock.calls[0][0]).toBe(_modelBody);
        expect(_sequelizeModelInstance.create.mock.calls[0][1]).toBeDefined();
        expect(_sequelizeModelInstance.create.mock.calls[0][1]).toHaveProperty('include');
        expect(Array.isArray(_sequelizeModelInstance.create.mock.calls[0][1]['include'])).toBe(true);
        expect(_sequelizeModelInstance.create.mock.calls[0][1]['include'].length).toBe(2);
    });
});