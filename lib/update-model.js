(function(module){
    'use strict';
    
    const   restify = require('restify'),
            getTenant = require('./get-tenant'),
            getModelInstance = require('./get-model-instance'),
            modelUtils = require('./model-utils');
                
    function updateIncluded(modelData, modelInstance, res){
        let includedModels = modelUtils.getIncludedModels(modelData, modelInstance, true);
        if(includedModels.length > 0){
            let toBeUpdated = [];
            includedModels.filter(elm => modelData[elm.relName]).forEach(function(includedModel){
                if(Array.isArray(modelData[includedModel.relName])){
                    Array.prototype.push.apply(toBeUpdated, modelData[includedModel.relName].map(function(elm){
                        return includedModel.target.build(elm);
                    }));
                } else {
                    toBeUpdated.push(includedModel.target.build(modelData[includedModel.relName]));
                }
            });

            Promise.all(toBeUpdated.map(elm => elm.save())).then(
                result => res.send(200, modelInstance),
                err => res.send(new restify.InternalServerError(err))
            );
        } else {
            res.send(200, modelInstance);
        }
    }

    module.exports = function (server, modelName, models, logger){
        return function (req, res){
			if(req.body && req.body.id){
                let modelInstance = getModelInstance(models(server, getTenant(req)), modelName);
                modelInstance.findById(req.body.id).then(
					function(instance){
						if(instance){
							instance.update(req.body).then(
                                function(result){
                                    updateIncluded(req.body, result, res);
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