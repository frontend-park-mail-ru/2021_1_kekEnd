const http = require('http');
const fs = require('fs');

const host = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    console.log('request', req.url);

    // default html; will be 'index.html' when main page is ready
    let file = 'signup.html';

    if (req.url !== '/') {
        file = req.url.replace('/', '');
    }

    fs.readFile(`src/public/${file}`, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, host, () => {
    console.log(`Server is listening on ${host}:${port}`);
});
