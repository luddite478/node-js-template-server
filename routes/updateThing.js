const DB = require('../db');

async function updateThing(req, res) {
  try {
    const params = {
      values: req.body[0],
      id: req.body[1].id,
    }

    const result = await DB.updateThing(params);

    result.hasError
      ? res.send(result.err)
      : res.status(200).end();

  } catch(err) {
      console.log(err);
  }
};

module.exports = updateThing;
