const eventEmitter = require('events');
const events = new eventEmitter.EventEmitter();

events.on('get-updates', async (data) => {

    const { updates } = data;
    console.log(updates, '*** get-updates event ***');
    // trigger send email event
    return updates;
})


module.exports = events;