const { Worker, parentPort, isMainThread, threadId } = require('worker_threads');

class Processor {

    constructor(threads) {
        this._threads = threads;
    }

    process(data) {
        this._processInWorkers(data);
    }

    _processInWorkers(data) {
        for (let i = 0; i < this._threads; i++) {
            this._startWorker(data);
        }
    }

    _startWorker(data) {
        const worker = new Worker(__filename);
        worker.on('message', () => this._sendData(worker, data));
    }

    _sendData(worker, data) {
        const number = data.shift();

        number ? 
            worker.postMessage(number) :
            worker.terminate();
    }
}

function startWorker() {
    parentPort.postMessage(true);

    parentPort.on('message', message => setTimeout(() => {
        console.log(`Number processed: '${message}' in worker '${threadId}'`);
        parentPort.postMessage(true);
    }, 1000));
}

if (!isMainThread) {
    startWorker();
}

module.exports = Processor;