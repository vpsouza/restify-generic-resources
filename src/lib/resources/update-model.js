import restify from 'restify';
import {resolveSuccess, resolveError, getTenant} from '../utils';
import {getModelById, updateModel, updateModelIncluded} from '../services';

export default (appAuthSecret, server, modelName, models, logger) => (req, res) => {
    if (req.body && req.body.id) {
        [
            getTenant(appAuthSecret),
            getModelById(server, modelName, models),
            updateModel,
            updateModelIncluded
        ].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body.id, req.body]))
            .then((result) => resolveSuccess(res, result))
            .catch((err) => resolveError(res, new restify.InternalServerError(err.message), logger));
    } else {
        resolveError(res, new restify.BadRequestError('Invalid Request Body'), null);
    }
};