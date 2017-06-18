'use strict';
import {getIncludedModels} from 'easyutils';

export default ([modelBody, modelInstance, ...opt] = data) => 
    Promise.all(
        getIncludedModels(modelBody, modelInstance, true)
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