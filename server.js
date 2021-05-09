const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/tk1', (req, res) => {
  fetch('https://reference.intellisense.io/thickenernn/v1/referencia')
    .then(response => {
      return response.json()
    })
    .then(data => {
      res.send(data);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));