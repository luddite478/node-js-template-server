async function getThings(params) {
  try {
    if(!isEmpty(params)){
      const result = await this.pool.query(`SELECT * FROM things WHERE id=${params.id}`);
      return result.rows;
    } else {
      const result = await this.pool.query(`SELECT * FROM things`);
      return result.rows;
    }

  } catch(err) {
      console.log(err);
      return null
  }
}

function isEmpty(obj) {
  for(let key in obj) {
    if(obj.hasOwnProperty(key))
        return false;
  }
  return true;
}

module.exports = getThings;
