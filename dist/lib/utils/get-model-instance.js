'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (models, modelName) {
  return models[modelName.charAt(0).toUpperCase() + modelName.slice(1)];
};