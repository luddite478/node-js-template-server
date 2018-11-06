const DB = require('../db');

async function getThings(req, res) {
  try {

    const result = req.params.id
      ? await DB.getThings(req.params.id)
      : await DB.getThings()

    result
      ? res.send(result)
      : res.send('Can not get things')

  } catch(err) {
    res.status(500).end()
    console.log(err);
  }
};

module.exports = getThings;
