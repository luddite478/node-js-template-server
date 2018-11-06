async function checkUserCredentials(params) {
  try {

    const { name, password } = params;

    const queryStr = `SELECT * FROM users WHERE name='${name}' AND password='${password}'`;

    const result = await this.pool.query(queryStr);

    if(!result.rows || Array.isArray(result.rows) && result.rows.length === 0) {
      return null
    };
    result.rows[0].name = result.rows[0].name.trim();
    result.rows[0].password = result.rows[0].password.trim();
    return result.rows[0]

  } catch(err) {
      console.log(err);
      return null;
  }
}

module.exports = checkUserCredentials;
