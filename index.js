'use strict';
require('dotenv').config();
const { start } = require('./src/server.js');


// Start up DB Server
const { db } = require('./src/auth/models/index.js');
db
.sync()
.then(() => {
  console.log('made it here') 
  // Start the web server
  start();
  })
.catch(console.error);
