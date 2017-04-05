(function(module){
    'use strict';
 
    module.exports = function(server, models, tenantID){
        // connect on database with public schema
        const dbInstance = models(server, null, true ).sequelize;

        return dbInstance.showAllSchemas().then(
            function(result){
                if(tenantID){
                    let tenantDbInstance = models(server, tenantID, true ).sequelize;
                    if(!result.includes(tenantID)){
                        return tenantDbInstance.createSchema(tenantID).then(
                            function(resultCreate){
                                return doSyncDB(tenantDbInstance, tenantID);
                            },
                            function(err){
                                return new Promise((fulfill, reject) => reject({msg: 'Creation of the schema failure', err: err}));
                            }
                        )
                    } else {
                        return doSyncDB(tenantDbInstance, tenantID);
                    }    
                } else {
                    return Promise.all(result.map((schemaName) => doSyncDB(models(server, schemaName, true ).sequelize, schemaName, res)));
                }
            },
            function(err){
                return new Promise((fulfill, reject) => reject({msg: 'List of all availble schema failure', err: err}));
            }
        );
    }

    function doSyncDB(dbInstance, tenantID){
        return dbInstance.sync({force:true}, {schema: tenantID})
        .then(
            function (result) {
                return new Promise((fulfill, reject) => fulfill({msg: 'Database Sync Done'}));
            },
            function(err) {
                return new Promise((fulfill, reject) => reject({msg: 'Database Sync Failure', err: err}));
            }
        );
    }
}(module));