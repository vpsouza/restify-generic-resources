
'use strict';

export default ([modelBody, instance, ...opt] = data) => 
    instance ?
    instance.update(modelBody).then((result) => Promise.resolve([modelBody, result, ...opt])) :
    Promise.reject({
        'msg': 'Record not found'
    });