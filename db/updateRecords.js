async function updateRecords(table, params) {
 try {
   const { values, options } = params;
   const valuesQueryStr = this.convertObjectToSqlQueryString('=', values);
   const optionsQueryStr = this.convertObjectToSqlQueryString('=', options);

   await this.pool.query(`UPDATE ${table} SET ${valuesQueryStr} WHERE ${optionsQueryStr}`);

   return {
     hasError: false
   }

 } catch(err) {
     console.log('Error in db/updateRecords.js: ' + err);
     return {
       err,
       hasError: true,
     }
 }
}

module.exports = updateRecords;
