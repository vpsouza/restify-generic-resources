'use strict';

import getModelInstance from './get-model-instance';

let models = {
    Customer: {},
    Employee: {},
    invalidModel: {}
}

test('find an existing sequelize model instance', () => {
    ['customer', 'employee'].forEach(modelName => expect(getModelInstance(models, modelName)).toBeDefined());
});

test('find a non-existing sequelize model instance', () => {
    ['product', 'agenda', 'invalidModel'].forEach(modelName => expect(getModelInstance(models, modelName)).not.toBeDefined());
});