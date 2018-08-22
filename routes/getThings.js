const DB = require('../db');

async function getThings(req, res) {
  try {

    const result = await DB.getThings(req.query);

    result
      ? res.send(result)
      : res.send('Error')

  } catch(err) {
    console.log(err);
  }
};

module.exports = getThings;
