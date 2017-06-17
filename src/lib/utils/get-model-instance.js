'use strict';

export default (models, modelName) => models[modelName.charAt(0).toUpperCase() + modelName.slice(1)];