const { Worker } = require('worker_threads');

function process(config) {
    for (let i = 0; i < config.threads; i++) {
        createWorker(config);
    }
}

function createWorker(config) {
    const d = config.data.shift();

    if (d) {
        const worker = new Worker(config.filename, { 
            workerData: {
                data: d,
                configuration: config.configuration
            } 
        });
        worker.on('exit', () => createWorker(config));
    }
}


module.exports = { process };