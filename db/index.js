const { Pool } = require('pg');
const readRecords = require('./readRecords');
const createRecord = require('./createRecord');
const deleteRecords = require('./deleteRecords');
const updateRecords = require('./updateRecords');
const convertObjectToSqlQueryString = require('./convertObjectToSqlQueryString');

class DataBaseInterface {
  constructor(credentials){
    this.pool = new Pool(credentials);
    this.pool.on('error', () => console.log('Error in db/index.js: ' + err));
  }
  create(table, params){
    return createRecord.bind(this)(table, params);
  }
  read(table, params){
    return readRecords.bind(this)(table, params);
  }
  update(table, params){
    return updateRecords.bind(this)(table, params);
  }
  delete(table, params){
    return deleteRecords.bind(this)(table, params);
  }
  convertObjectToSqlQueryString(typeOfString, obj){
    return convertObjectToSqlQueryString(typeOfString, obj)
  }
}

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const DB = new DataBaseInterface(credentials);

module.exports = DB;
