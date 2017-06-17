'use strict';
import * as services from './lib/services';
import * as resources from './lib/resources';
import validating from 'restify-sequelize-validation';

const setupAPI = (appAuthSecret, server, modelName, models, logger) => {
    server.get(modelName + '/:id',  resources.getModelById(server, modelName, models, logger));
    server.put(modelName,           validating(server, modelName, models), resources.createModel(server, modelName, models, logger));
    server.post(modelName,          validating(server, modelName, models), resources.updateModel(server, modelName, models, logger));
    server.get(modelName,           resources.listAll(server, modelName, models, logger));
    server.post(modelName,          resources.listAll(server, modelName, models, logger));
    server.del(modelName + '/:id',  resources.deleteModel(server, modelName, models, logger));
};

export  {
    services,
    resources,
    setupAPI
};