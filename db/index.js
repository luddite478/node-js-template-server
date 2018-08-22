const { Pool } = require('pg');
const getThings = require('./getThings');
const createThing = require('./createThing');
const checkUserCredentials = require('./checkUserCredentials');
const deleteThings = require('./deleteThings');
const updateThing = require('./updateThing');
const convertObjectToSqlQueryString = require('./convertObjectToSqlQueryString');
const findUserById = require('./findUserById')

class DataBaseInterface {
  constructor(credentials){
    this.pool = new Pool(credentials);
    this.pool.on('error', () => console.log(err));
  }
  checkUserCredentials(params) {
    return checkUserCredentials.call(this, params);
  }
  findUserById(params) {
    return findUserById.call(this, params);
  }
  getThings(params){
    return getThings.call(this, params);
  }
  createThing(params){
    return createThing.call(this, params);
  }
  updateThing(params){
    return updateThing.call(this, params);
  }
  deleteThings(params){
    return deleteThings.call(this, params);
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
