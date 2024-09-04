const cron = require('node-cron');

async function fetchUpdates() {
    console.log('got here FOR UPDATES');
    return true;
}
async function schedule() {
    cron.schedule("* * * * *", async () => {
        console.log('got here FOR SCHEDULE again');
        await fetchUpdates();
    });
}

module.exports = {
    schedule
}