'use strict';

const jwt    = require('jsonwebtoken');

export default AUTH_SECRET => ([token, ...opts] = data) => new Promise((resolve, reject) => 
    jwt.verify(token, AUTH_SECRET, function(err, decoded) {
        if (err) {
            reject({'msg': 'Fail to verify request token', 'err': err});
        } else {
            resolve([decoded.tenantID, ...opts]);
        }
    })
);