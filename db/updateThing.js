async function updateThings(params) {
 try {
   const { id, values } = params;
   const valuesQueryStr = this.convertObjectToSqlQueryString('=', values);
   console.log(`UPDATE things SET ${valuesQueryStr} WHERE id=${params.id}`);
   await this.pool.query(`UPDATE things SET ${valuesQueryStr} WHERE id=${params.id}`);

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
