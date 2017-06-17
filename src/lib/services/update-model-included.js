'use strict';
import {getIncludedModels} from '../utils';

export default ([modelBody, modelInstance, ...opt] = data) => 
    Promise.all(
        modelUtils.getIncludedModels(modelBody, modelInstance, true)
        .filter(elm => modelBody[elm.relName])
        .reduce((includedModel, total) => {
            if(Array.isArray(modelBody[includedModel.relName])){
                Array.prototype.push.apply(total, modelBody[includedModel.relName].map(elm => includedModel.target.build(elm).save()));
            } else {
                total.push(includedModel.target.build(modelBody[includedModel.relName]).save());
            }
            return total;
        }, [])
    ).then(data => Promise.resolve([...opt, data]));
    
    /*let toBeUpdated = [];
    modelUtils.getIncludedModels(modelBody, modelInstance, true)
        
        .forEach(includedModel => {
            if(Array.isArray(modelBody[includedModel.relName])){
                Array.prototype.push.apply(toBeUpdated, modelBody[includedModel.relName].map(function(elm){
                    return includedModel.target.build(elm);
                }));
            } else {
                toBeUpdated.push(includedModel.target.build(modelBody[includedModel.relName]));
            }
        });
    return Promise.all(toBeUpdated.map(elm => elm.save())).then(data => Promise.resolve([...opt, data]));*/