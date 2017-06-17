'use strict';

export default (res, result) => 
    result ?
        res.send(200, Array.isArray(result) ? {length: result.length, result: result} : result)
    :
        res.send(200, {});