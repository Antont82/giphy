const https = require('https');
const config = require('../config');
const logger = require('../utils/logger');

async function requestFromGiphy(keyWord) {
    var options = {
        timeout: 3000,
        host: 'api.giphy.com',
        path: '/v1/gifs/search?limit='+config.giphy.limit+'&offset=0&rating=g&lang=en&api_key='+config.giphy.key+'&q='+encodeURIComponent(keyWord)
    };

    return new Promise((resolve, reject) => {
        var req = https.request(options, function(res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                logger.info('statusCode=' + res.statusCode);
                //return reject(new Error('statusCode=' + res.statusCode));
                resolve({data:[],errno:'statusCode=' + res.statusCode})
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });

            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('timeout', () => {
            req.abort();
            logger.error('Timeout');
            //reject(new Error('Timeout'));
            resolve({data:[],errno:'Timeout in connection'})
        });

        req.on('error', function(err) {
            // This is not a "Second error", just a different failure
            logger.error({error:err,location:'giphy request'});
            //reject(err);
            resolve({data:[],errno:err})
        });
        req.end();
    });
}

module.exports={requestFromGiphy};