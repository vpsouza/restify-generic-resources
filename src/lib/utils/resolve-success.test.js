'use strict';

import resolveSuccess from './resolve-success';

let res = null;

beforeEach(() => {
    res = {
        send: jest.fn()
    };
});

const body = {myObj: 'Text'};

const expectResObject = (resObj) => {
    expect(resObj.send).toHaveBeenCalled();
    expect(resObj.send.mock.calls.length).toBe(1);
    expect(resObj.send.mock.calls[0].length).toBe(2);
    expect(resObj.send.mock.calls[0][0]).toBe(200);
};

test('resolve success without body', () => {
    resolveSuccess(res);
    expectResObject(res);
    expect(res.send.mock.calls[0][1]).toBeDefined();
});

test('resolve success with body as object', () => {
    resolveSuccess(res, body);
    expectResObject(res);
    expect(res.send.mock.calls[0][1]).toBe(body);
});

test('resolve success with body as array of object', () => {
    let arrayOfBody = [body,body,body,body,body];
    resolveSuccess(res, arrayOfBody);
    expectResObject(res);
    expect(res.send.mock.calls[0][1]).toBeDefined();
    expect(res.send.mock.calls[0][1]).toHaveProperty('length', 5);
    expect(res.send.mock.calls[0][1]).toHaveProperty('result', arrayOfBody);
});