const morganBody = require('morgan-body');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('../routes');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors({origin: '*', methods: '*', allowedHeaders: '*'}))
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const log = fs.createWriteStream(
    path.join(__dirname, "../logs", `express.log`), { flags: "a" }
);
morganBody(app, {
    noColors: true,
    stream: log,
});

app.use('/', router);
module.exports = app;