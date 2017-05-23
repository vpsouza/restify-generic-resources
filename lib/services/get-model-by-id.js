(function (module) {
    'use strict';
    const getModelInstance = require('../get-model-instance');
    const modelUtils = require('../model-utils');
    const fetchModelRelations = require('./fetch-model-relations');
        
    module.exports = (server, modelName, models) => 
        ([tenantID, id, ...opts] = data) => 
            getModelInstance(models(server, tenantID), modelName)
                .findById(id)
                .then(fetchModelRelations)
                .then(resultInstance => Promise.resolve([resultInstance, ...opts]));

    function devolveFetchedResult(resultInstance, opts){
        return Promise.resolve([resultInstance, ...opts]);
    }
}(module));