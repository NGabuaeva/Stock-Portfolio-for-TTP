const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://127.0.0.1:5432/${databaseName}`,
  {
    logging: false,
    dialect: 'postgres',
  }
);
module.exports = db;

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
