async function deleteThings(id, table) {

 try {
   console.log(`DELETE FROM things WHERE id=${id}`);
   await this.pool.query(`DELETE FROM things WHERE id=${id}`);
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
