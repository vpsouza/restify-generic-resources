'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var fetchLazyProperty = function fetchLazyProperty(relKey) {
    return function (result) {
        return Promise.resolve(_defineProperty({}, relKey, result.map(function (res) {
            return res.dataValues;
        })));
    };
};
var mapLazyProperty = function mapLazyProperty(modelInstance) {
    return function (relKey) {
        return modelInstance['get' + _.startCase(relKey)].bind(modelInstance)().then(fetchLazyProperty(relKey));
    };
};

exports.default = function (modelInstance) {
    return Promise.all(Object.keys(modelInstance.$Model.getRelations()).map(mapLazyProperty(modelInstance))).then(function (result) {
        return Promise.resolve(Object.assign.apply(null, [modelInstance.dataValues].concat(_toConsumableArray(result))));
    });
};