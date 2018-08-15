const express = require('express');
const getThings = require('./getThings');
const addThing = require('./addThing');
const deleteThings = require('./deleteThings');
const updateThings = require('./updateThings');

module.exports = app => {
  app.get('/things', getThings);
  app.post('/things', addThing);
  app.delete('/things', deleteThings);
  app.put('/things', updateThings);
};
