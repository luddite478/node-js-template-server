const DB = require('../db');

async function deleteThings(req, res) {
  try {

     if(!req.params.id) {
       res.status(400).send('You need to specify id');
     } else {
       const result = await DB.deleteThings(req.params.id);
       result.hasError
         ? res.send('Can not delete thing')
         : res.status(200).end()
     }

  } catch(err) {
      res.status(500).end()
      console.log(err);
  }
};

module.exports = deleteThings;
