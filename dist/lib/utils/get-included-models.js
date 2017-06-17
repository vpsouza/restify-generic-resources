'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (modelInstance, model, includeRelName) {
    return Object.keys(model.getRelations()).filter(function (key) {
        return modelInstance[key];
    }).map(function (elm) {
        return includeRelName ? {
            relName: elm,
            target: model.getRelations()[elm].target
        } : model.getRelations()[elm].target;
    });
};