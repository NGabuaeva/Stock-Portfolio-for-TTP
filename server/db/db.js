const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
    dialect: 'postgres',
  }
);
console.log('database:', process.env.DATABASE_URL)
module.exports = db;

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
