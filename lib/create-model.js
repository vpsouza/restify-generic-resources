(function(module){
	'use strict';
	
	const restify = require('restify'),
		  utils = require('./utils'),
		  getTenant = require('./get-tenant'),
		  getModelInstance = require('./get-model-instance'),
		  modelUtils = require('./model-utils');

    module.exports = function (server, modelName, models, logger){
        return function (req, res){
			if(req.body){
				[getTenant(process.env.AUTH_SECRET), createModel].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body]))
				.then((result) => utils.resolveSuccess(res, result))
				.catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger ));
			} else {
				utils.resolveError(res, new restify.BadRequestError('Invalid Request Body'), null);
			}
		}

		function createModel([tenantID, body] = data) {
			let modelInstance = getModelInstance(models(server, tenantID), modelName);
			return modelInstance.create(body, { include: modelUtils.getIncludedModels(body, modelInstance)});
		}
    }
}(module));