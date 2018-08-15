const DB = require('../db');

async function getThings(req, res) {
  try {
    const query = req.query;
    const result = await DB.read('things', query);

    result
      ? res.send(result)
      : res.send('Error')

  } catch(err) {
    console.log(err);
  }
};

module.exports = getThings;
