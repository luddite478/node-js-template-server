 async function createThing(params) {
  try {
    const columns = this.convertObjectToSqlQueryString(',', params);
    const valueDollarSigns = this.convertObjectToSqlQueryString('$', params);

    const values = Object.keys(params).map(key => params[key]);

    await this.pool.query(`INSERT INTO things(${columns}) VALUES(${valueDollarSigns})`, values);

    return {
      hasError: false
    }

  } catch(err) {
      console.log(err);
      return {
        err,
        hasError: true,
      }
  }
}

module.exports = createThing;
