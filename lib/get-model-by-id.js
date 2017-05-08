(function(module){
    'use strict';
    
    const   restify = require('restify'),
            getTenant = require('./get-tenant'),
            utils = require('./utils'),
            getModelInstance = require('./get-model-instance');

    module.exports = function (server, modelName, models, logger){
        return function (req, res){
            //req.header.tenantID);
            if(req.params && req.params.id){
                [getTenant(process.env.AUTH_SECRET), getModelById].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.params.id]))
                .then((result) => utils.resolveSuccess(res, result))
                .catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger ));
            } else {
                utils.resolveError(res, new restify.BadRequestError('Invalid Request Body'), null);
            }
        }

        function getModelById(tenantID, id){
            return getModelInstance(models(server, tenantID), modelName).findById(id);
        }
    }
}(module));