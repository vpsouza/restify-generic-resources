(function(module){
	'use strict';
	
	const restify = require('restify'),
		  getTenant = require('./get-tenant'),
		  getModelInstance = require('./get-model-instance'),
		  modelUtils = require('./model-utils');

    module.exports = function (server, modelName, models, logger){
        return function (req, res){
			if(req.body){
                let modelInstance = getModelInstance(models(server, getTenant(req)), modelName);
				modelInstance.create(req.body, { include: modelUtils.getIncludedModels(req.body, modelInstance)}).then(
					function(result){
                        if(result){
                            res.send(200, result);
                        } else {
                            res.send(200, {});
                        }
					},
					function(err){
						if(logger){
                            logger.error(err);
                        }
						res.send(new restify.InternalServerError(err.message));
					}
				);
			} else {
				res.send(new restify.BadRequestError('Invalid Request Body'));
			}
		}
    }
}(module));