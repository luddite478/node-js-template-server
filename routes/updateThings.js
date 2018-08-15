const DB = require('../db');

async function updateThing(req, res) {
  try {
    const params = {
      values: req.body[0],
      options: req.body[1],
    }

    const result = await DB.update('things', params);

    result.hasError
      ? res.send(result.err)
      : res.status(200).end();

  } catch(err) {
      console.log(err);
  }
};

module.exports = updateThing;
