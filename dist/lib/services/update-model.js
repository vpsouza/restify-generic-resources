
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

exports.default = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data,
        _ref2 = _toArray(_ref),
        modelBody = _ref2[0],
        instance = _ref2[1],
        opt = _ref2.slice(2);

    return instance ? instance.update(modelBody).then(function (result) {
        return Promise.resolve([modelBody, result].concat(_toConsumableArray(opt)));
    }) : Promise.reject({
        'msg': 'Record not found'
    });
};