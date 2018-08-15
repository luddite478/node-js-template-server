const DB = require('../db');

async function deleteThing(req, res) {
  try {
    const query = req.query;
    const result = await DB.delete('things', query);

    result.hasError
      ? res.send(result.err)
      : res.status(200).end();

  } catch(err) {
      console.log(err);
  }
};

module.exports = deleteThing;
