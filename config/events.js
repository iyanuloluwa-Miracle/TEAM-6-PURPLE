const eventEmitter = require('events');
const events = new eventEmitter.EventEmitter();

events.on('get-updates', async (data) => {

    const { updates } = data;
    // trigger send email event
    return updates;
})


module.exports = events;