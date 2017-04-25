(function(module){
    'use strict';
    
    const jwt    = require('jsonwebtoken');
    
    module.exports = function ([token, ...opts] = data){
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.auth.secret, function(err, decoded) {
                if (err) {
                    reject({'msg': 'Fail to verify request token', 'err': err});
                } else {
                    resolve([decoded.tenantID, ...opts]);
                }
            })
        });
    }
}(module));