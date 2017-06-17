'use strict';

var _resolveError = require('./resolve-error');

var _resolveError2 = _interopRequireDefault(_resolveError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var res = null;

beforeEach(function () {
    res = {
        send: jest.fn()
    };
});

var body = { myError: 'err' };

var expectResObject = function expectResObject(resObj) {
    expect(resObj.send).toHaveBeenCalled();
    expect(resObj.send.mock.calls.length).toBe(1);
    expect(resObj.send.mock.calls[0].length).toBe(1);
    expect(resObj.send.mock.calls[0][0]).toBe(body);
};

test('resolve error without logger argument', function () {
    (0, _resolveError2.default)(res, body);
    expectResObject(res);
});

test('resolve error passing logger as argument', function () {
    var logger = {
        error: jest.fn()
    };

    (0, _resolveError2.default)(res, body, logger);

    expect(logger.error).toHaveBeenCalled();
    expect(logger.error.mock.calls.length).toBe(1);
    expect(logger.error.mock.calls[0].length).toBe(1);
    expect(logger.error.mock.calls[0][0]).toBe(body);
    expectResObject(res);
});