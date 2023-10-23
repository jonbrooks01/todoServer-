'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');
const todo = require('./todo.js');
const Collection = require('./collection.js');

const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {},
      }
    : {};

const sequelize = new Sequelize(POSTGRES_URI);
const todoModel = todo(sequelize, DataTypes);
const todoCollection = new Collection(todoModel);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
  todoCollection,
};
