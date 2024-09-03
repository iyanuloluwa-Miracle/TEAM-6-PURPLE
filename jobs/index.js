const cron = require('node-cron');
async function start() {
    cron.schedule('* * * * *', async () => {
        await trackBooking();
        console.log('Bookings Jobs scheduled');
    });
}

async function trackBooking() {
    
}