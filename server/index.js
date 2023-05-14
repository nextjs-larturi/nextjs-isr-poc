const express = require('express');
const app = express();

const countriesDb = [
   {
      id: 1,
      name: 'brazil',
      // population: 213993437,
      population: 123123,
      continent: 'South America',
   },
   {
      id: 2,
      name: 'egypt',
      population: 104258327,
      continent: 'Africa',
   },
   {
      id: 3,
      name: 'malaysia',
      population: 32722760,
      continent: 'Asia',
   },
   {
      id: 4,
      name: 'france',
      population: 67059887,
      continent: 'Europe',
   },
   {
      id: 5,
      name: 'mexico',
      population: 130222815,
      continent: 'North America',
   },
];

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
