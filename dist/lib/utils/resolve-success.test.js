'use strict';

var _resolveSuccess = require('./resolve-success');

var _resolveSuccess2 = _interopRequireDefault(_resolveSuccess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var res = null;

beforeEach(function () {
    res = {
        send: jest.fn()
    };
});

var body = { myObj: 'Text' };

var expectResObject = function expectResObject(resObj) {
    expect(resObj.send).toHaveBeenCalled();
    expect(resObj.send.mock.calls.length).toBe(1);
    expect(resObj.send.mock.calls[0].length).toBe(2);
    expect(resObj.send.mock.calls[0][0]).toBe(200);
};

test('resolve success without body', function () {
    (0, _resolveSuccess2.default)(res);
    expectResObject(res);
    expect(res.send.mock.calls[0][1]).toBeDefined();
});

test('resolve success with body as object', function () {
    (0, _resolveSuccess2.default)(res, body);
    expectResObject(res);
    expect(res.send.mock.calls[0][1]).toBe(body);
});

test('resolve success with body as array of object', function () {
    var arrayOfBody = [body, body, body, body, body];
    (0, _resolveSuccess2.default)(res, arrayOfBody);
    expectResObject(res);
    expect(res.send.mock.calls[0][1]).toBeDefined();
    expect(res.send.mock.calls[0][1]).toHaveProperty('length', 5);
    expect(res.send.mock.calls[0][1]).toHaveProperty('result', arrayOfBody);
});