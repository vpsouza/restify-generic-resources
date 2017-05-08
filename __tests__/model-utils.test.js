'use strict';

const modelUtil = require('../lib/model-utils')

test('included models with includeRelName = true', () => {

    let ModelDef = {
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
            }
        }),
    };

    let modelInstance = {
        contacts: [{id: 1},{id:2}],
        address: [{id:1},{id:2}]
    }

    let resultIncludedModels = modelUtil.getIncludedModels(modelInstance, ModelDef, true);
    expect(resultIncludedModels.length).toBe(2);
    /*expect(resultIncludedModels).toHaveProperty('relName');
    expect(resultIncludedModels).toHaveProperty('target');*/

});

/*test('included models with includeRelName = false', () => {

    let assoc = {
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

        }
    };

    let resultIncludedModels = modelUtil.getIncludedModels(modelInstance, modelDef, true);
    expect(resultIncludedModels)[0].toHaveProperty('relName');
    expect(resultIncludedModels)[0].toHaveProperty('target');
});*/