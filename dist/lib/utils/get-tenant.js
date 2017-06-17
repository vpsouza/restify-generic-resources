'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var jwt = require('jsonwebtoken');

exports.default = function (AUTH_SECRET) {
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data,
            _ref2 = _toArray(_ref),
            token = _ref2[0],
            opts = _ref2.slice(1);

        return new Promise(function (resolve, reject) {
            return jwt.verify(token, AUTH_SECRET, function (err, decoded) {
                if (err) {
                    reject({ 'msg': 'Fail to verify request token', 'err': err });
                } else {
                    resolve([decoded.tenantID].concat(_toConsumableArray(opts)));
                }
            });
        });
    };
};