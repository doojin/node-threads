const Processor = require('./processor');

const data = [];
for (let i = 0; i < 1000; i++) {
    data.push(i);
}

const processor = new Processor(100);
processor.process(data);