'use strict';

export default (modelInstance, model, includeRelName) => 
    Object.keys(model.getRelations()).filter(key => modelInstance[key]).map(elm => 
        includeRelName ? {
            relName: elm,
            target: model.getRelations()[elm].target
        } : model.getRelations()[elm].target);