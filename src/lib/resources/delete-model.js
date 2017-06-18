'use strict';

import restify from 'restify';
import {resolveSuccess, resolveError, getTenant} from 'easyutils';
import {getModelById, deleteModel} from '../services';

export default (appAuthSecret, server, modelName, models, logger) => 
    (req, res) => {
        if (req.params && req.params.id) {
            [
                getTenant(appAuthSecret), 
                getModelById(server, modelName, models), 
                deleteModel(modelName)
            ]
            .reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.params.id]))
            .then((result) => resolveSuccess(res, result))
            .catch((err) => resolveError(res, new restify.InternalServerError(err.message), logger));
        } else {
            resolveError(res, new restify.BadRequestError('Invalid Request Body'), null);
        }
    }