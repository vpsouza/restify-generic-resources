
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _easyutils = require('easyutils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

exports.default = function (server, modelName, models) {
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data,
            _ref2 = _toArray(_ref),
            tenantID = _ref2[0],
            id = _ref2[1],
            opts = _ref2.slice(2);

        return (0, _easyutils.getModelInstance)(models(server, tenantID), modelName).findById(id).then(function (resultInstance) {
            return Promise.resolve([resultInstance].concat(_toConsumableArray(opts)));
        });
    };
};