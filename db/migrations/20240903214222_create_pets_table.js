/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pets", function (table) {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("name").notNullable();
    table.enu("species", ["dog", "cat", "bird", "other"]).notNullable();
    table.integer("age").notNullable();
    table.string("breed").notNullable();
    table.string("health_status").notNullable();
    table.boolean("available").defaultTo(true).notNullable();
    table
      .uuid("shelter_id")
      .notNullable()
      .references("id")
      .inTable("shelter")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pets");
};
