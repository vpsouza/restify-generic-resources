r(function(module){
    'use strict';
    
    const   restify = require('restify'),
            getTenant = require('./get-tenant'),
            utils = require('./utils'),
            getModelInstance = require('./get-model-instance');

    module.exports = function (server, modelName, models, logger){
        
        return function (req, res){
			if(req.params && req.params.id){
                [getTenant(process.env.AUTH_SECRET), findModelToDelete, deleteModel].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.params.id]))
                .then((result) => utils.resolveSuccess(res, result))
                .catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger ));
			} else {
                utils.resolveError(res, new restify.BadRequestError('Invalid Request Body'), null);
			}
		}

        function findModelToDelete([tenantID, id] = data) {
            let modelInstance = getModelInstance(models(server, tenantID), modelName);
            return modelInstance.findById(id);
        }

        function deleteModel(instance) {
            if(!instance)
                return Promise.reject({'msg': modelName + ' record not found'});
            return instance.destroy();
        }
    }
}(module));