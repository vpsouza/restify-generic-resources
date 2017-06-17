'use strict';

import {getIncludedModels, getModelInstance} from '../utils';

export default (server, modelName, models) => ([tenantID, modelBody] = data) => {
    let sequelizeModelInstance = getModelInstance(models(server, tenantID), modelName);
    return sequelizeModelInstance.create(modelBody, {
        include: getIncludedModels(modelBody, sequelizeModelInstance)
    });
};