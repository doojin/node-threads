const { workerData } = require('worker_threads');

setTimeout(() => console.log(workerData.data), workerData.configuration.delay);