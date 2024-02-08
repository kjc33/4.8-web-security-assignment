const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory");

// Test Connection Function
async function testConnection() {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("Connection has been established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  testConnection,
  sequelize,
};
