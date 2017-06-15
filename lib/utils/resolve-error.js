'use strict';

export default (res, body, logger) => {
    if(logger){
        logger.error(err);
    }
    res.send(body);
};