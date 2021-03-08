const express = require('express');

// const host = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.static(`${__dirname}/src`));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/src/index.html`);
});

app.listen(port, () => {
    console.log(`Express server is listening on :${port}`);
});
