'use strict';

import deleteModel from './delete-model';

let _sequelizeModelInstance = null;

beforeEach(() => {
        _sequelizeModelInstance = {
        destroy: jest.fn(() => Promise.resolve(1))
    };
});

let _modelName = 'myModel';

test('Testing delete service passing a sequelize model instance', () => {
    return deleteModel(_modelName)([_sequelizeModelInstance]).then(result => {
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(1);
        expect(_sequelizeModelInstance.destroy.mock.calls.length).toBe(1);
        expect(_sequelizeModelInstance.destroy.mock.calls[0].length).toBe(0);
    });
});

test('Testing delete service passing a sequelize model instance and other values', () => {
    let arrayOfOtherValues = [12, {id:2}, 'test'];
    return deleteModel(_modelName)([_sequelizeModelInstance, ...arrayOfOtherValues]).then(result => {
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(4);
        expect(result[0]).toBe(1);
        expect(result.some(r=> arrayOfOtherValues.includes(r))).toBe(true);
        expect(_sequelizeModelInstance.destroy.mock.calls.length).toBe(1);
        expect(_sequelizeModelInstance.destroy.mock.calls[0].length).toBe(0);
    });
});

test('Testing delete service without a sequelize model instance', () => {
    return deleteModel(_modelName)([null]).catch(err => {
        expect(err).toBeDefined();
        expect(err).toHaveProperty('msg', _modelName + ' record not found');
        expect(_sequelizeModelInstance.destroy.mock.calls.length).toBe(0);
    });
});