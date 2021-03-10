const express = require('express');

const port = 3000;

const app = express();

app.use(express.static(`${__dirname}/src`));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/src/index.html`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Express server is listening on :${port}`);
});
