const express = require('express');
const countriesDb = require('./db/country');
const app = express();

app.get('/country', (req, res) => {
   res.json(countriesDb);
});

app.get('/country/:nameOrId', (req, res) => {
    const nameOrId = req.params.nameOrId;
  
    let country;
  
    if (!isNaN(nameOrId)) {
      country = countriesDb.find(c => c.id.toString() === nameOrId.toString());
    } else {
      country = countriesDb.find(c => c.name.toLowerCase() === nameOrId.toLowerCase());
    }
  
    if (country) {
      res.json(country);
    } else {
      res.status(404).send('Country not found');
    }
  });
  

app.listen(3000, () => {
   console.log('Server listening on port 3000');
});
