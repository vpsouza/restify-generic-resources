'use strict';
import * as services from './lib/services';
import * as resources from './lib/resources';
import validating from 'restify-sequelize-validation';

const setupAPI = (appAuthSecret, server, modelName, models, logger) => {
    server.get(modelName + '/:id',  resources.getModelById(appAuthSecret, server, modelName, models, logger));
    server.put(modelName,           validating(server, modelName, models), resources.createModel(appAuthSecret, server, modelName, models, logger));
    server.post(modelName,          validating(server, modelName, models), resources.updateModel(appAuthSecret, server, modelName, models, logger));
    server.get(modelName,           resources.listAll(appAuthSecret, server, modelName, models, logger));
    server.post(modelName,          resources.listAll(appAuthSecret, server, modelName, models, logger));
    server.del(modelName + '/:id',  resources.deleteModel(appAuthSecret, server, modelName, models, logger));
};

export  {
    services,
    resources,
    setupAPI
};