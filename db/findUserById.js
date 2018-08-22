async function findUserById(id) {
  try {
    const queryStr = `SELECT * FROM users WHERE id=${id}`;
    const result = await this.pool.query(queryStr);

    if(!result.rows || Array.isArray(result.rows) && result.rows.length === 0) {
      return null
    };

    return result.rows[0]

  } catch(err) {
      console.log(err);
      return null;
  }
}

module.exports = findUserById;
