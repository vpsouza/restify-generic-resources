/**
 * Generate a generic C.R.U.D. api using restify and sequelize-multi-tenancy
 * @return {object}
 */
module.exports = (function() {
    'use strict';
    
      const validating = require('restify-sequelize-validation'),
            getModelById = require('./lib/get-model-by-id'),
            createModel = require('./lib/create-model'),
            updateModel = require('./lib/update-model'),
            listAllModels = require('./lib/list-all-models'),
            deleteModel = require('./lib/delete-model'),
            initDB = require('./lib/init-db');

        return {
            services: {
                initDb: require('./lib/services/init-db')
            },
            resources: {
                getModelById: getModelById,
                listAllModels: listAllModels,
                createModel: createModel,
                updateModel: updateModel,
                deleteModel: deleteModel,
                initDB: initDB,
            },
            setupAPI: function(appAuthSecret, server, modelName, models, logger){
                server.get(modelName + '/:id',  getModelById(server, modelName, models, logger));
                server.put(modelName,           validating(server, modelName, models), createModel(server, modelName, models, logger));
                server.post(modelName,          validating(server, modelName, models), updateModel(server, modelName, models, logger));
                server.get(modelName,           listAllModels(server, modelName, models, logger));
                server.post(modelName,          listAllModels(server, modelName, models, logger));
                server.del(modelName + '/:id',  deleteModel(server, modelName, models, logger));
            }
        }
})();