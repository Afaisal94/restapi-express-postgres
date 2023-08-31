const { Sequelize } = require('sequelize');

let DATABASE = process.env.DB_NAME;
let USER = process.env.DB_USER;
let PASSWORD = process.env.DB_PASSWORD;

const db = new Sequelize(DATABASE, USER, PASSWORD,{
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT
});

(async () => {
  await db.sync();
})();

module.exports = db;