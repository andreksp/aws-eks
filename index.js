'use strict';

const express = require('express');
var os = require("os");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

var hostname = os.hostname();

app.get("/", (req, res) => {
    res.send(`Hostname is ${hostname}`);
});

app.listen(PORT, HOST);

console.log(`Application is running on http://${HOST}:${PORT}`);
console.log(`Hostname is ${hostname}`)

