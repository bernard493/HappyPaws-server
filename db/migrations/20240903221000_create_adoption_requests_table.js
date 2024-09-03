/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("adoption_requests", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table.uuid("pet_id").notNullable().references("id").inTable("pets");
    table.enu("status", ["pending", "approved", "rejected"]).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("adoption_requests");
};