const DB = require('../db');

async function updateThing(req, res) {
  try {

    if(req.params.id && req.body){
      const params = {
        values: req.body,
        id: req.params.id
      }
      const result = await DB.updateThing(params);
      result.hasError
        ? res.send('Can not update thing')
        : res.status(200).end();
    } else {
      res.status(400).send('You need to specify id');
    }

  } catch(err) {
      res.status(500).end()
      console.log(err);
  }
};

module.exports = updateThing;
