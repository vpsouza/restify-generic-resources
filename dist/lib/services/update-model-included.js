'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

exports.default = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data,
        _ref2 = _toArray(_ref),
        modelBody = _ref2[0],
        modelInstance = _ref2[1],
        opt = _ref2.slice(2);

    return Promise.all(modelUtils.getIncludedModels(modelBody, modelInstance, true).filter(function (elm) {
        return modelBody[elm.relName];
    }).reduce(function (includedModel, total) {
        if (Array.isArray(modelBody[includedModel.relName])) {
            Array.prototype.push.apply(total, modelBody[includedModel.relName].map(function (elm) {
                return includedModel.target.build(elm).save();
            }));
        } else {
            total.push(includedModel.target.build(modelBody[includedModel.relName]).save());
        }
        return total;
    }, [])).then(function (data) {
        return Promise.resolve([].concat(_toConsumableArray(opt), [data]));
    });
};

/*let toBeUpdated = [];
modelUtils.getIncludedModels(modelBody, modelInstance, true)
    
    .forEach(includedModel => {
        if(Array.isArray(modelBody[includedModel.relName])){
            Array.prototype.push.apply(toBeUpdated, modelBody[includedModel.relName].map(function(elm){
                return includedModel.target.build(elm);
            }));
        } else {
            toBeUpdated.push(includedModel.target.build(modelBody[includedModel.relName]));
        }
    });
return Promise.all(toBeUpdated.map(elm => elm.save())).then(data => Promise.resolve([...opt, data]));*/