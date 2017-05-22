(function(module){
    'use strict';
    
    const jwt    = require('jsonwebtoken');
    
    module.exports = AUTH_SECRET => ([token, ...opts] = data) => new Promise((resolve, reject) => {
            if(!AUTH_SECRET)
				return resolve(null);

			jwt.verify(token, AUTH_SECRET, function(err, decoded) {
                if (err) {
                    reject({'msg': 'Fail to verify request token', 'err': err});
                } else {
                    resolve([decoded.tenantID, ...opts]);
                }
            })
        });
        
}(module));