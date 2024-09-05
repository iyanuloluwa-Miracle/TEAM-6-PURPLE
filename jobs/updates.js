const cron = require('node-cron');
const updatedData = require('../data/updatesData');
const events = require('../config/events');


async function fetchUpdates() {
    const updates = await updatedData;
    events.emit('get-updates', { updates });
    return { updates}
}

async function schedule() {
    cron.schedule("* * * * *", async () => {
        console.log('*** start scheduling ***');
        await fetchUpdates();
    });
}

module.exports = {
    schedule
}