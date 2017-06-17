'use strict';

import createModel from './create-model';

let _createdSequelizeModelInstance = {
    id: '128963bdbw789wb238',
    foo: 'bar'
};

let _sequelizeModelInstance = {
    create: jest.fn(() => Promise.resolve(_createdSequelizeModelInstance)),
    getRelations: () => ({
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
    })
};
let _models = (server, tenantID) => ({
    'ModelName': _sequelizeModelInstance
});
let strModelName = 'modelName';
let _modelBody = {
    contacts: [{id: 1},{id:2}],
    address: [{id:1},{id:2}]
};

test('Testing create service', () => {
    return createModel(null, strModelName, _models)(['test', _modelBody]).then(inst => {
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