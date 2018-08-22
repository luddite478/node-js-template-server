async function deleteThings(params, table) {

 try {
   const queryStr = this.convertObjectToSqlQueryString('=', params);
   await this.pool.query(`DELETE FROM things WHERE ${queryStr}`);
   return {
     hasError: false
   }

 } catch(err){
    console.log(err);
    return {
      hasError: true,
      err
    }
 }
}

module.exports = deleteThings;
