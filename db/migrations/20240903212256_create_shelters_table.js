/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("shelter", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("phone_number").notNullable();
    table.string("email").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("shelter");
};
