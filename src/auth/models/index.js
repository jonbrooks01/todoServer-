'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

// const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     }
//   }
// } : {};

const sequelize = new Sequelize(POSTGRES_URI);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
};
