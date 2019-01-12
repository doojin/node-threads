const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', { workerData: 'test data' });

worker.on('error', error => console.log(`Error occurred: ${error}`));
worker.on('message', message => console.log(`Message received: ${message}`));
worker.on('exit', () => console.log('Worker quit'));