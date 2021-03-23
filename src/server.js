const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
require('dotenv').config();

const PORT = process.env.APP_PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.get('/api', function (req, res) {
  return res.status(200).send('OK');
});

app.listen(PORT, function () {
  console.log(`Server is listening to http://localhost:${PORT}`);
});
