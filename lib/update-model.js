(function(module){
    'use strict';
    
    const   restify = require('restify'),
            getTenant = require('./get-tenant'),
            utils = require('./utils'),
            getModelInstance = require('./get-model-instance'),
            modelUtils = require('./model-utils');

    module.exports = function (server, modelName, models, logger){
        return function (req, res){
			if(req.body && req.body.id){
                [getTenant(process.env.AUTH_SECRET), findById, update, updateIncluded].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body.id, req.body, res]))
                .then((result) => utils.resolveSuccess(res, result))
                .catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger ));
			} else {
				res.send(new restify.BadRequestError('Invalid Request Body'));
			}
		}

        function findById([tenantID, id, body, res] = data) {
            let modelInstance = getModelInstance(models(server, tenantID), modelName);
            return modelInstance.findById(id).then((instance) => Promise.resolve([body, instance, res]));
        }

        function update([body, instance, res] = data){
            if(instance)
                return instance.update(body).then((result) => Promise.resolve([body, result, res]));

            return Promise.reject({'msg': modelName + ' record not found'});
        }

        function updateIncluded([body, modelInstance, res] = data){
            return new Promise((resolve, reject) => {
                let includedModels = modelUtils.getIncludedModels(body, modelInstance, true);
                if(includedModels.length > 0){
                    let toBeUpdated = [];
                    includedModels.filter(elm => body[elm.relName]).forEach(function(includedModel){
                        if(Array.isArray(body[includedModel.relName])){
                            Array.prototype.push.apply(toBeUpdated, body[includedModel.relName].map(function(elm){
                                return includedModel.target.build(elm);
                            }));
                        } else {
                            toBeUpdated.push(includedModel.target.build(body[includedModel.relName]));
                        }
                    });

                    Promise.all(toBeUpdated.map(elm => elm.save())).then(
                        result => resolve(result)
                    ).catch(
                        err => reject(err)
                    );
                } else {
                    resolve(modelInstance);
                }
            });
        }
    }
}(module));