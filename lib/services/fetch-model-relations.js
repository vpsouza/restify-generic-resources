'use strict';

const _ = require('lodash');

const fetchLazyProperty = relKey => result => Promise.resolve(({[relKey] : result.map(res => res.dataValues)}))
const mapLazyProperty = modelInstance => relKey => modelInstance['get' + _.startCase(relKey)].bind(modelInstance)().then(fetchLazyProperty(relKey));

module.exports = modelInstance => 
    Promise
        .all(Object.keys(modelInstance.$Model.getRelations()).map(mapLazyProperty(modelInstance)))
        .then(result => {
            return Promise.resolve(Object.assign.apply(null, [modelInstance.dataValues, ...result]))
        });