'use strict';

const winston = require('winston');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const { format }= require('winston');
const { combine, label, json } = format;

if (!fs.existsSync(config.logger.directoryPath)) {
    fs.mkdirSync(config.logger.directoryPath);
}
const loggerFileFullPath = path.join(config.logger.directoryPath, config.logger.fileName);

function getTransports() {
    var transports = [
        new winston.transports.File({filename: loggerFileFullPath, handleExceptions: true})
    ];
    if (config.logger.consoleLog) {
        transports.push(new winston.transports.Console());
    }
    return transports;
}

winston.configure({
    format: combine(
        label({ label: config.env }),
        json()
    ),
    level: config.loger.level,
    transports: getTransports()
});

winston.warningOnePercent = function(message){
        winston.warn(message);
};

module.exports = winston;
