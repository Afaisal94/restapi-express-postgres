const { Sequelize } = require('sequelize');

let DATABASE = "db_shop";
let USER = "root";
let PASSWORD = "docker";

const db = new Sequelize(DATABASE, USER, PASSWORD,{
    host: 'localhost',
    dialect: "postgres"
});

(async () => {
  await db.sync();
})();

module.exports = db;