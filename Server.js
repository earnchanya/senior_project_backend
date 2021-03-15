const middleware = require('./middleware')
const lodash = require('lodash')
const express = require('express');
const db = require("./models");
const Server = express();

Server.use(middleware)

const options = {
     useNewUrlParser: true,
     useUnifiedTopology: true,
}

db.mongoose
  .connect(db.url, options)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
//     process.exit();
  });

Server.get('/', async(req, res) => {
  let {filters} = req.query
  // console.log({filters})
  
  if (!filters) res.send({Error: 'No filters'})
  filters =  lodash.isArray(filters) ? filters : [filters]
  
  const query = filters.map(filter => {
    const key = `total_probability.${filter}`
    return { [key]: { $gte: 0.5 } }
  })
  
  try {
    const data = await db.threadDetails.find( { $or: query } )
    .sort({clickstream:-1}).limit(10)
    .then(threads => threads)
    // console.log(`query ${data}`)
    res.send({threads:data})
  } catch(e) {
    res.status(500).send(e)
  }

});

Server.get('/results', async(req, res) => {
  let a = req.query.category
  // console.log(a)
  if (a === 'forest') {
    try {
      const data = await db.threadDetails.find({'total_probability.0': {$gte: 0.5}})
      .sort({'total_probability.0':-1}).limit(10)
      .then(threads => threads)
      res.send({threads:data})
    } catch(e) {
      res.status(500).send(e)
    }
  }
  else if (a === 'mountain') {
    try {
      const data = await db.threadDetails.find({'total_probability.1': {$gte: 0.5}})
      .sort({'total_probability.1':-1}).limit(10)
      .then(threads => threads)
      res.send({threads:data})
    } catch(e) {
      res.status(500).send(e)
    }
  }
  else if (a === 'sea') {
    try {
      const data = await db.threadDetails.find({'total_probability.2': {$gte: 0.5}})
      .sort({'total_probability.2':-1}).limit(20)
      .then(threads => threads)
      res.send({threads:data})
    } catch(e) {
      res.status(500).send(e)
    }
  }
  else res.send({Error: 'No category'})

});

// set port, listen for requests
const PORT = process.env.PORT || 8020;
Server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});