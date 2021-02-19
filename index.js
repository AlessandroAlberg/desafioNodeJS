const app = require('./config/express');
const cron = require('node-cron');
const utils = require('./utils/userUtils')

cron.schedule("0 0 20 * * *", () => {
    utils.clearCache();
});

app.listen(3000);

module.exports = app;