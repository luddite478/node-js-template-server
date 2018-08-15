async function deleteRecords(table, params) {

 try {
   const queryStr = this.convertObjectToSqlQueryString('=', params);
   await this.pool.query(`DELETE FROM ${table} WHERE ${queryStr}`);
   return {
     hasError: false
   }

 } catch(err){
    console.log(`Error in db/deleteRecords.js: ` + err);
    return {
      hasError: true,
      err
    }
 }
}

module.exports = deleteRecords;
