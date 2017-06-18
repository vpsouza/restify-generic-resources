'use strict';

import restify from 'restify';
import {resolveSuccess, resolveError, getTenant} from 'easyutils';
import {listAll} from '../services';

export default (appAuthSecret, server, modelName, models, logger) =>
    (req, res) => 
        [getTenant(appAuthSecret), listAll(server, modelName, models)].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body]))
            .then((result) => resolveSuccess(res, result))
            .catch(err => resolveError(res, new restify.InternalServerError(err), logger));