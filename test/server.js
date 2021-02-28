const express = require('express');

const host = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.static(`${__dirname}/js`));
app.use(express.static(`${__dirname}/../src/public/js`));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, host, () => {
    console.log(`Test server is listening on ${host}:${port}`);
});

