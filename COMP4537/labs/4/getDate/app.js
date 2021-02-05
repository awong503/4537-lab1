'use strict';
let myUtil = require('../modules/utils.js')
let http = require('http');
let fs = require('fs');
let url = require('url');

let port = process.env.PORT;
if (port == null || port == "") { port = 8080; }
let numberOfRequests = 0;
http.createServer(function (req, res) {

    res.writeHead(200, {'Content-type':'text/plain'});
    let q = url.parse(req.url, true);
    let qObject = q.query;
    res.write(myUtil.createMessage(qObject, myUtil.getDate()));
    res.end();
}
).listen(port)
console.log('listening ...');


