(function(module){
    'use strict';
    
    const   getTenant = require('./get-tenant'),
            service = require('./services/init-db');

    module.exports = function (server, modelName, models, logger){    
        return function (req, res){
            service(server, models, getTenant(req)).then(
                (res) => res.send(200, res),
                (err) => res.send(500, err)
            );
        }
    }
}(module));