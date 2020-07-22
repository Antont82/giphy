const path = require("path");
const search = require("../controllers/search");
const logger = require('../utils/logger');

module.exports = (app) => {

    app.get('/search', async (req, res) => {
        if(typeof req.query.search !=='string') res.end('EROOR');
        let keyWord = (req.query.search || '').toLowerCase().trim();
        if(keyWord!=='') {
            res.send(await search.search(keyWord));
        } else {
            logger.debug("Empty query request");
            res.send('empty');
        }
    });

    app.get('/ping', function(req,res) {
        res.send('pong');
    });

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, "../static", "index.html"));
    });

};