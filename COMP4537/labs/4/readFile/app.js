'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');

let numberOfreqs = 0;
let port = process.env.PORT;
if (port == null || port == "") { port = 8080; }

http.createServer(function (req, res) {
    req.n = numberOfreqs;
    console.log('req number ' + numberOfreqs + ' received!');

    let q = url.parse(req.url, true);
    let pathArr = q.pathname.split("/");
    let filename = pathArr[pathArr.length - 1]
    setTimeout(function () {
        fs.readFile("../" + filename, function (err, contents) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("404 Not Found\n" + filename);
            } else {
                res.writeHead(200, { 'Content-type': 'text/plain' });
                res.write(contents);
                console.log("res to the req# " + req.n);
            }
            res.end();
        });
    }, 2000);

    numberOfreqs++;
}
).listen(port);
console.log('listening ...');

