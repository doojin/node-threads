const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');

run();

async function run() {
    isMainThread ? 
        await runMainThread() : 
        await runChildThread();
}

function runMainThread() {
    for (let i = 0; i < 10; i++) {
        const workerData = { number: i };
        const worker = new Worker(__filename, { workerData });
        worker.on('message', message => console.log(message));
        worker.on('error', error => console.log(`Error occurred: ${error}`));
        worker.on('exit', () => console.log('worker finished it\'s work'));
    }
}

function runChildThread() {
    parentPort.postMessage(`Number processed: ${workerData.number}`);
}