const cron = require('node-cron');
const jobs = require('./jobs');

jobs.forEach(job => {
    job.schedule();
});