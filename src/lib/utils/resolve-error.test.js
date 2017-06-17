'use strict';

import resolveError from './resolve-error';

let res = null;

beforeEach(() => {
    res = {
        send: jest.fn()
    };
});

const body = {myError: 'err'};

const expectResObject = (resObj) => {
    expect(resObj.send).toHaveBeenCalled();
    expect(resObj.send.mock.calls.length).toBe(1);
    expect(resObj.send.mock.calls[0].length).toBe(1);
    expect(resObj.send.mock.calls[0][0]).toBe(body);
};

test('resolve error without logger argument', () => {
    resolveError(res, body);
    expectResObject(res);
});

test('resolve error passing logger as argument', () => {
    const logger = {
        error: jest.fn()
    };
    
    resolveError(res, body, logger);

    expect(logger.error).toHaveBeenCalled();
    expect(logger.error.mock.calls.length).toBe(1);
    expect(logger.error.mock.calls[0].length).toBe(1);
    expect(logger.error.mock.calls[0][0]).toBe(body);
    expectResObject(res);
});