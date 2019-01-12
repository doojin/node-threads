const { isMainThread, Worker, MessageChannel, parentPort } = require('worker_threads');

isMainThread ? runMainThread() : runChildThread();

function runMainThread() {
    const worker = new Worker(__filename);
    const { port1, port2 } = new MessageChannel();

    worker.postMessage({ port: port1 }, [ port1 ]);
    port2.on('message', message => console.log(`message received from worker: ${message}`));
}

function runChildThread() {
    parentPort.once('message', message => message.port.postMessage('test message'));
}