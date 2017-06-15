'use strict';

export default ([modelInstance, ...opt] = data) =>
    modelInstance ?
    modelInstance.destroy().then(result => Promise.resolve([result, ...opt])) :
    Promise.reject({
        'msg': modelName + ' record not found'
    });