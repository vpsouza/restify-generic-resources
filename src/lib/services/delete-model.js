'use strict';

export default modelName => ([modelInstance, ...opt] = data) =>
    modelInstance ?
        modelInstance.destroy().then(result => Promise.resolve([result, ...opt])) 
        :
        Promise.reject({
            'msg': modelName + ' record not found'
        });