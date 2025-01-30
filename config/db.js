const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable SQL query logging if not needed
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL Database.');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL', err);
  });


module.exports = sequelize;


module.exports = sequelize;
