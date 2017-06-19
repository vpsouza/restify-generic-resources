'use strict';

import {getModelInstance, getIncludedModels} from 'easyutils';

const normalizeWhereClause = (whereClauseParam, modelInstance) => {
    if(whereClauseParam){
        if(whereClauseParam['where']){
            return {
                where: whereClauseParam['where']
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
        return null;
    }
};

export default (server, modelName, models) => ([tenantID, modelBody] = data) => {
    let sequelizeModelInstance = getModelInstance(models(server, tenantID), modelName);
	let whereClause = normalizeWhereClause(modelBody || null, sequelizeModelInstance );
    return whereClause ? sequelizeModelInstance.findAll(whereClause) : sequelizeModelInstance.findAll();
};