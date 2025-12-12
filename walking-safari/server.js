const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.get('/config.local.js', (req, res) => {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (token) {
    res.type('application/javascript');
    res.send(`var MAPBOX_TOKEN_OVERRIDE = '${token}';`);
  } else {
    res.status(404).send('Not found');
  }
});

app.use(express.static('.'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
