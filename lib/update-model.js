(function(module){
    'use strict';
    
    const   restify = require('restify'),
                getTenant = require('./get-tenant'),
                getModelInstance = require('./get-model-instance');
                
    module.exports = function (server, modelName, models, logger){
        return function (req, res){
			if(req.body && req.body.id){
                let modelInstance = getModelInstance(models(server, getTenant(req)), modelName);
                modelInstance.findById(req.body.id).then(
					function(instance){
						if(instance){
							instance.update(req.body).then(
                                function(result){
                                    res.send(200, result);
                                },
                                function(err){
                                    if(logger){
                                        logger.error(err);
                                    }
                                    res.send(new restify.InternalServerError(err));
                                }
                            );
						} else {
                            res.send(new restify.InternalServerError(modelName + ' record not found'));
						}
					},
                    function(err){
                        if(logger){
                            logger.error(err);
                        }
						res.send(new restify.InternalServerError(err));
                    }
				);
			} else {
				res.send(new restify.BadRequestError('Invalid Request Body'));
			}
		}
    }
}(module));