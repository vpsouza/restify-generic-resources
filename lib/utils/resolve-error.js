'use strict';

export default (res, body, logger) => {
    if(logger){
        logger.error(body);
    }
    res.send(body);
};