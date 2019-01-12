const { workerData, parentPort } = require('worker_threads');

parentPort.postMessage('test message');
console.log(`Processing worker data: ${workerData}`);
throw new Error('test error');