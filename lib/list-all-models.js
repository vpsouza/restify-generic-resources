(function(module){
    'use strict';
    
    const   restify = require('restify'),
            getTenant = require('./get-tenant'),
            utils = require('./utils'),
            getModelInstance = require('./get-model-instance'),
            modelUtils = require('./model-utils');

    module.exports = function (server, modelName, models, logger){
        
        return function (req, res){
            [getTenant(process.env.AUTH_SECRET), findAll].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body]))
                .then((result) => utils.resolveSuccess(res, result))
                .catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger ));
        }

        function findAll([tenantID, body] = data) {
            let modelInstance = getModelInstance(models(server, tenantID), modelName);//req.header.tenantID);
            return modelInstance.findAll(normalizeWhereClause(body || null,modelInstance ));
        }

        function normalizeWhereClause(whereClauseParam, modelInstance){
            if(whereClauseParam){
                if(whereClauseParam['where']){
                    return {
                        where: whereClauseParam['where'],
                        include: modelUtils.getIncludedModels(null, modelInstance)
                    };
                } else {
                    let whereClause = {
                        "$or": []
                    }
                    for(let prop in modelInstance){
                        let clause = {};
                        clause[prop] = { "$like" : "%" + modelInstance[prop] + "%"};
                        whereClause["$or"].push(clause);
                    }
                    return whereClause;
                }
            } else {
                return {
                    include: modelUtils.getIncludedModels(null, modelInstance)
                };
            }
        }
    }
}(module));