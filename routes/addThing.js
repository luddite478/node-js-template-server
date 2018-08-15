const DB = require('../db');

async function addThing(req, res) {
  try {
    const body = req.body;
    const result = await DB.create('things', body);

    result.hasError
      ? res.send(result.err)
      : res.status(200).end();

  } catch(err) {
      console.log(err);
  }
};

module.exports = addThing;
