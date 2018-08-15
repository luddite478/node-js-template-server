async function readRecords(table, params) {
  try {
    const columns = this.convertObjectToSqlQueryString(',', params);

    if(!isEmpty(params)){
      const result = await this.pool.query(`SELECT ${columns} FROM ${table}`);
      return result.rows;
    } else {

      const result = await this.pool.query(`SELECT * FROM ${table}`);
      return result.rows;
    }

  } catch(err) {
      console.log('Error in db/readRecords.js: ' + err);
      return null
  }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = readRecords;
