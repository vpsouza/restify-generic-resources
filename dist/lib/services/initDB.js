'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var doSyncDB = function doSyncDB(dbInstance, tenantID) {
	return dbInstance.sync({
		force: true
	}, {
		schema: tenantID
	}).then(function (resultSync) {
		return Promise.resolve({
			msg: 'Database Sync Done',
			result: resultSync
		});
	}).catch(function (errSync) {
		return Promise.reject({
			msg: 'Database Sync Failure',
			err: errSync
		});
	});
};

exports.default = function (server, models, tenantID) {
	return (
		// connect on database with public schema
		models(server, null, true).sequelize.showAllSchemas().then(function (result) {
			if (tenantID) {
				var tenantDbInstance = models(server, tenantID, true).sequelize;
				if (tenantID != 'public' && !result.includes(tenantID)) return tenantDbInstance.createSchema(tenantID).then(function (resultCreate) {
					return doSyncDB(tenantDbInstance, tenantID);
				}).catch(function (errCreate) {
					return Promise.reject({
						msg: 'Creation of the schema failure',
						err: errCreate
					});
				});else return doSyncDB(tenantDbInstance, tenantID);
			} else return Promise.all(result.map(function (schemaName) {
				return doSyncDB(models(server, schemaName, true).sequelize, schemaName, res);
			}));
		}).catch(function (err) {
			return Promise.reject({
				msg: 'List of all availble schema failure',
				err: err
			});
		})
	);
};