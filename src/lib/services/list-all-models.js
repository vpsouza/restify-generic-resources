'use strict';

import {getModelInstance, getIncludedModels} from 'easyutils';

const normalizeWhereClause = (whereClauseParam, modelInstance) => {
    if(whereClauseParam){
        if(whereClauseParam['where']){
            return {
                where: whereClauseParam['where'],
                include: getIncludedModels(null, modelInstance)
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
            include: getIncludedModels(null, modelInstance)
        };
    }
};

export default (server, modelName, models) => ([tenantID, modelBody] = data) => {
    let sequelizeModelInstance = getModelInstance(models(server, tenantID), modelName);
    return sequelizeModelInstance.findAll(normalizeWhereClause(modelBody || null, sequelizeModelInstance ));
};