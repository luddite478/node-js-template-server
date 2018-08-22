const DB = require('../db');

async function deleteThings(req, res) {
  try {
    
    const query = req.query;
    const result = await DB.deleteThings(query);

    result.hasError
      ? res.send(result.err)
      : res.status(200).end();

  } catch(err) {
      console.log(err);
  }
};

module.exports = deleteThings;
