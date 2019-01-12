const { Worker, parentPort, isMainThread } = require('worker_threads');

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
        const number = data.shift();

        if (number) {
            const worker = new Worker(__filename);
            console.log(`Worker started: ${worker.threadId}`);
            worker.on('exit', () => this._startWorker(data));
            worker.postMessage(number);
        }
    }
}

function startWorker() {
    parentPort.on('message', message => setTimeout(() => {
        console.log(`Number processed: ${message}`);
        process.exit();
    }, 1000));
}

if (!isMainThread) {
    startWorker();
}

module.exports = Processor;