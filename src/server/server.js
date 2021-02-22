const http = require('http');
const fs = require('fs');

const host = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    let file = 'index.html';
    console.log(req.url);
    if (req.url !== '/') {
        file = req.url.replace('/', '');

        if (req.url.includes('.js')) {
            res.setHeader('Content-type', 'text/javascript') // почему-то у меня без этого не грузило js файлы
        }
        if (req.url.includes('.css')) {
            res.setHeader('Content-type', 'text/css') // и css тоже
        }
    }

    fs.readFile(`src/${file}`, (error, data) => {
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
