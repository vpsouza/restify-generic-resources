(function(module){
    'use strict';
    
    const   getTenant = require('./get-tenant'),
            service = require('./services/init-db');

    module.exports = function (server, modelName, models, logger){    
        return function (req, res){
            getTenant(req.params.jwt)
            .then(tenantID => service(server, models, tenantID))
            .then(result => res.send(200, result))
            .catch(err => res.send(500, err));
        }
    }
}(module));