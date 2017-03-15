(function(module){
    'use strict';
    
    const   restify = require('restify'),
            getTenant = require('./get-tenant'),
            getModelInstance = require('./get-model-instance');

    module.exports = function (server, modelName, models, logger){
        return function (req, res){
            //req.header.tenantID);
            if(req.params && req.params.id){
                getModelInstance(models(server, getTenant(req)), modelName).findById(req.params.id).then(
                    function(result){
                        if(result){
                            res.send(200, result);
                        } else {
                            res.send(200, {});
                        }
                    },
                    function(err){
                        if(logger){
                            logger.error(err);
                        }
                        res.send(new restify.InternalServerError(err));
                    }
                )
            } else {
                res.send(new restify.BadRequestError('Invalid Request Parameters'));
            }
            
        }
    }
}(module));