// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql2",
  connection: {
    // eslint-disable-next-line no-undef
    host: process.env.DB_CONNECTION_HOST,
    // eslint-disable-next-line no-undef
    user: process.env.DB_CONNECTION_USER,
    // eslint-disable-next-line no-undef
    password: process.env.DB_CONNECTION_PASSWORD,
    // eslint-disable-next-line no-undef
    database: process.env.DB_CONNECTION_DATABASE_NAME,
    charset: "utf8",
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
