const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', { stdout: true, stderr: true });

worker.stdout.on('data', data => console.log(`Out stream received data: ${data}`));
worker.stderr.on('data', data => console.log(`Error stream received data: ${data}`));

worker.on('error', () => console.log('Some error occured'));