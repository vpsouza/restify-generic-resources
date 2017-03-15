(function(module){
    'use strict';
    
    const   getTenant = require('./get-tenant');

    module.exports = function (server, modelName, models, logger){    

        return function (req, res){
            const tenantID = getTenant(req);

            // sync() will create all table if they doesn't exist in database
            const dbInstance = models(server, null, true ).sequelize;
            dbInstance.showAllSchemas().then(
                function(result){
                    let tenantDbInstance = models(server, tenantID, true ).sequelize;

                    if(!result.includes(tenantID)){
                        tenantDbInstance.createSchema(tenantID).then(
                            function(result){
                                doSyncDB(tenantDbInstance, tenantID, res);
                            },
                            function(err){
                                if(logger){
                                    logger.error(err);
                                }
                                res.send(500, {msg: 'Creation of the schema failure', err: err});
                            }
                        )
                    } else {
                        doSyncDB(tenantDbInstance, tenantID, res);
                    }
                },
                function(err){
                    if(logger){
                        logger.error(err);
                    }
                    res.send(500, {msg: 'List of all availble schema failure', err: err});
                }
            );
        }

        function doSyncDB(dbInstance, tenantID, res){
            dbInstance.sync({force:true}, {schema: tenantID}).then(
                function (result) {
                    res.send(200, {msg: 'Database Sync Done'});
                },
                function(err) {
                    if(logger){
                        logger.error(err);
                    }
                    res.send(500, {msg: 'Database Sync Failure', err: err});
                }
            );
        }
    }
}(module));