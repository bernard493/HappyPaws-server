/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shelter").del();
  await knex("shelter").insert([
    {
      id: "590b5195-89ad-11ef-aa19-ed8d14985cf", // Generates a UUID
      name: faker.company.name(), // Generates a random company name
      address: `${faker.location.street()},London Uk`,
      phone_number: faker.phone.number(), // Generates a random phone number
      email: "Kylie76@example.org", // Generates a random email address
      avatar: faker.image.avatar(), // Generates a random avatar image URL
      status: faker.datatype.boolean(), // Generates a random boolean value
      created_at: knex.fn.now(), // Sets the current timestamp for creation
      updated_at: knex.fn.now(), // Sets the current timestamp for last update
    },
    {
      id: "590b54d8-89ad-11ef-aa10-e8d8d14985cf",
      name: faker.company.name(),
      address: `${faker.location.street()},London Uk`,
      phone_number: faker.phone.number(),
      email: "Erling.Sauer98@example.org",
      avatar: faker.image.avatar(),
      status: faker.datatype.boolean(),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    
  ]);
};
