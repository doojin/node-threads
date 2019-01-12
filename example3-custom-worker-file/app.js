const processor = require('./processor');

processor.process({
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    threads: 3,
    filename: './jobs/printDataWithDelayJob.js',
    configuration: { delay: 2000 }
});