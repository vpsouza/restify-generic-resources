'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

exports.default = function (modelName) {
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data,
            _ref2 = _toArray(_ref),
            modelInstance = _ref2[0],
            opt = _ref2.slice(1);

        return modelInstance ? modelInstance.destroy().then(function (result) {
            return Promise.resolve([result].concat(_toConsumableArray(opt)));
        }) : Promise.reject({
            'msg': modelName + ' record not found'
        });
    };
};