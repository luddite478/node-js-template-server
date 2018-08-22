async function updateThings(params) {
 try {
   const { values, id } = params;
   const valuesQueryStr = this.convertObjectToSqlQueryString('=', values);
   await this.pool.query(`UPDATE things SET ${valuesQueryStr} WHERE id=${id}`);

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

module.exports = updateThings;
