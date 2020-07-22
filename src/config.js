module.exports = {
    logger: {
        consoleLog: true,
        logLevel: "info",
        directoryPath: 'logs',
        fileName: 'giphy-node.log'
    },
    web:{
        port:399
    },
    giphy:{
        key: 'API-KEY',
        limit:25
    }
};