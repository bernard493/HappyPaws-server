/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table.uuid("pet_id").notNullable().references("id").inTable("pets");
    table.integer("rating");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
