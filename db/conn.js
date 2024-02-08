const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRESQL_DATABASE);

// Test Connection Function

async function testConnection() {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("Connection has been established successfully!");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

module.exports = {
  testConnection,
  sequelize,
};
