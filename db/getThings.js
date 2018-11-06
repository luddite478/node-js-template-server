async function getThings(id) {
  try {
    if(id){
      const result = await this.pool.query(`SELECT * FROM things WHERE id=${id}`);
      return result.rows[0];
    } else {
      const result = await this.pool.query(`SELECT * FROM things`);
      return result.rows;
    }

  } catch(err) {
      console.log(err);
      return null
  }
}

module.exports = getThings;
