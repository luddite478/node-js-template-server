const DB = require('../db');

async function addThing(req, res) {
  try {

    const result = await DB.createThing(req.body);

    result.hasError
      ? res.send('Can not add thing')
      : res.status(200).end();

  } catch(err) {
      res.status(500).end()
      console.log(err);
  }
};

module.exports = addThing;
