'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');
let numberOfreqs = 0;

let port = process.env.PORT;
if (port == null || port == "") { port = 8080; }

http.createServer(function (req) {
    req.n = numberOfreqs;
    console.log('req number ' + numberOfreqs + ' received!');

    let q = url.parse(req.url, true);
    let queryObj = q.query;
    let text = (queryObj.text === undefined ? "" : queryObj.text);
    // https://yourDomainName.ca/COMP4537/labs/4/writeFile/?text=Hello
    // which appends a new line with text Hello to the text file file.txt

    setTimeout(function () {
        fs.appendFile("../file.txt", "\n"+text, function (err) {
            if (err) throw err;
        });
    }, 2000);

    numberOfreqs++;
}
).listen(port);
console.log('listening ...');

