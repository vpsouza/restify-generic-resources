'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _easyutils = require('easyutils');

exports.default = function (server, modelName, models) {
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data,
            _ref2 = _slicedToArray(_ref, 2),
            tenantID = _ref2[0],
            modelBody = _ref2[1];

        var sequelizeModelInstance = (0, _easyutils.getModelInstance)(models(server, tenantID), modelName);
        return sequelizeModelInstance.create(modelBody, {
            include: (0, _easyutils.getIncludedModels)(modelBody, sequelizeModelInstance)
        });
    };
};