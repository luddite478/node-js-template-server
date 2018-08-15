function convertObjectToSqlQueryString(typeOfString, obj){
  try {

    switch(typeOfString){
      case '=':
          return Object.keys(obj).reduce((acc, key, i, arr) => {
              if(arr.length === 1) {
                return `${key}='${obj[key]}'`;
              }
              return i !== arr.length-1
                        ? `${acc}${key}='${obj[key]}' AND `
                        : `${acc}${key}='${obj[key]}' `
            }, '');

      case '$':
          return Object.keys(obj).reduce((acc, key, i, arr) => {
                return i !== arr.length-1
                          ? acc + `$${i+1}, `
                          : acc + `$${i+1} `
              }, '');

      case ',':
          return Object.keys(obj).reduce((acc, key, i, arr) => {
                return i !== arr.length-1
                          ? acc + `${key}, `
                          : acc + `${key} `
              }, '');

      default:
          throw new Error('Error in ./convertObjectToSqlQueryString.js');
    }

  } catch(err){
    console.log('Error in ./convertObjectToSqlQueryString.js ' + err);
  }
}

module.exports = convertObjectToSqlQueryString;