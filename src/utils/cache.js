const LRU = require("lru-cache");


class Cacher {

    constructor(dataLoader, options = {maxAge: 60 * 1000}) {
        this.dataLoader = dataLoader;
        this.cache = new LRU(options);
        this.options = options;
    }

    async get(key, dataHandlingFunction) {
        //let functionLoad = (typeof dataHandlingFunction !== "undefined") ? dataHandlingFunction : JSON.parse;
        let functionLoad = (typeof dataHandlingFunction !== "undefined") ? dataHandlingFunction : (x)=>{ return x; };
        let value = this.cache.get(key);
        if (value!==undefined) {
            return value;
        }

        let loadData = await this.dataLoader(key);
        if (!loadData) loadData = {};
        else loadData = functionLoad(loadData);

        this.cache.set(key, loadData);
        return loadData;
    }

}

module.exports =  Cacher;