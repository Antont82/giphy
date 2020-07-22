"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var httpServer = null;

async function setupRoutes() {
    app.use(bodyParser.json());
    app.use("/js", express.static(__dirname + '/static/js'));
    app.use("/css", express.static(__dirname + '/static/css'));

    require('./routes/home.js')(app);
}

function startServer(serverPort) {
    httpServer = app.listen(serverPort,'0.0.0.0', () => {
        console.log('server listening on port', (httpServer != null ? httpServer.address().port : null));
    });

    return httpServer;
}

function stopServer() {
    console.log( "Shutting down Server. Closing out remaining connections.");
    httpServer.close();
}


module.exports = { setupRoutes, startServer, stopServer };