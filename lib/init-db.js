(function(module){
    'use strict';
    
    const   getTenant = require('./get-tenant'),
            service = require('./services/init-db');

    module.exports = function (server, modelName, models, logger){    
        return function (req, res){
            service(server, models, getTenant(req)).then(
                (result) => res.send(200, result),
                (err) => res.send(500, err)
            );
        }
    }
}(module));