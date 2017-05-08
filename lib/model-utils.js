(function (module) {
    module.exports = {
        getIncludedModels: (modelInstance, model, includeRelName) => {
            return Object.keys(model.getRelations()).filter(key => modelInstance[key]).map(elm => {
                return includeRelName ? {
                    relName: elm,
                    target: model.getRelations()[elm].target
                } : model.getRelations()[elm].target;
            });
        }
    }
})(module);