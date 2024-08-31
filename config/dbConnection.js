const mysql = require("mysql");
require("dotenv").config();

const dbConnection = mysql.createConnection({
  // eslint-disable-next-line no-undef
  host: process.env.DB_CONNECTION_HOST,
  // eslint-disable-next-line no-undef
  user: process.env.DB_CONNECTION_USER,
  // eslint-disable-next-line no-undef
  password: process.env.DB_CONNECTION_PASSWORD,
  // eslint-disable-next-line no-undef
  database: process.env.DB_CONNECTION_DATABASE_NAME,
});

dbConnection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  // Display the connected database name
  console.log('connected as id ' + dbConnection.threadId);
});

module.exports = dbConnection;
