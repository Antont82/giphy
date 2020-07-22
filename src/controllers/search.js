const giphy = require('../utils/giphy');
const Cacher = require('../utils/cache');
const logger = require('../utils/logger');

function dataLoadFromFunction(key) {
    return giphy.requestFromGiphy(key);
}

const Cache = new Cacher(dataLoadFromFunction);

async function search(keyWord) {
    logger.info("Searching for "+keyWord);
    return await Cache.get(keyWord);
}

module.exports={ search };