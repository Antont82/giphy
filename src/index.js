'use strict';
const config = require('./config');
const logger = require('./utils/logger');
const server = require('./server');
const inspect = require('util').inspect;

function handleError(error,inf) {
    logger.error('Unhandled error!');
    logger.error(inspect(error));
}

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

async function gracefulShutdown() {
    console.log('Shutting down giphy');
    server.stopServer();
    process.exit(0)
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

logger.info("Starting giphy server with config:");
logger.info(JSON.stringify(config));


setTimeout(() => {
    if(config.giphy.key!='' && config.giphy.key!='API-KEY') {
        server.startServer(config.web.port);
        server.setupRoutes();
    } else {
        logger.error('API-KEY not configured');
    }

}, 1);





