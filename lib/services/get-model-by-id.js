
'use strict';
import {getModelInstance} from '../utils';
    
export default (server, modelName, models) => 
    ([tenantID, id, ...opts] = data) => 
        getModelInstance(models(server, tenantID), modelName)
            .findById(id)
            .then(resultInstance => Promise.resolve([resultInstance, ...opts]));
