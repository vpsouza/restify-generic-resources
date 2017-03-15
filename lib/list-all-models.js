(function(module){
    'use strict';
    
    const   restify = require('restify'),
            getTenant = require('./get-tenant'),
            getModelInstance = require('./get-model-instance'),
            modelUtils = require('./model-utils');

    module.exports = function (server, modelName, models, logger){
        return function (req, res){
            let modelInstance = getModelInstance(models(server, getTenant(req)), modelName);//req.header.tenantID);

            let whereClause = req.body || null;
            
            modelInstance.findAll(normalizeWhereClause(whereClause,modelInstance )).then(
                function(result){
                    if(result){
                        res.send(200, {
                            length: result.length,
                            result: result});
                    } else {
                        res.send(200, {length: 0, result: []});
                    }
                },
                function(err){
                    if(logger){
                        logger.error(err);
                    }
                    res.send(new restify.InternalServerError(err));
                }
            );
        }
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
}(module));