const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: knex.raw("UUID()"), // Assuming you're using UUID as the primary key
      username: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      role: "adopter",
      avatar: faker.image.avatar(),
    },
    {
      id: "590b5195-89ad-11ef-aa19-ed8d14985cf",
      username: faker.person.fullName(),
      email: "Kylie76@example.org",
      password: faker.internet.password(),
      role: "shelter",
      avatar: faker.image.avatar(),
    },
    {
      id: "590b54d8-89ad-11ef-aa10-e8d8d14985cf",
      username: faker.person.fullName(),
      email: "Erling.Sauer98@example.org",
      password: faker.internet.password(),
      role: "shelter",
      avatar: faker.image.avatar(),
    },
    {
      id: "590b54d8-89ad-11ef-aa50-e8d8d14985cf",
      username: faker.person.fullName(),
      email: "Ulises44@example.net",
      password: faker.internet.password(),
      role: "shelter",
      avatar: faker.image.avatar(),
    },
    {
      id: knex.raw("UUID()"),
      username: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      role: "shelter",
      avatar: faker.image.avatar(),
    },
    {
      id: knex.raw("UUID()"),
      username: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      role: "shelter",
      avatar: faker.image.avatar(),
    },
    {
      id: knex.raw("UUID()"),
      username: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      role: "shelter",
      avatar: faker.image.avatar(),
    },
    {
      id: knex.raw("UUID()"),
      username: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      role: "admin",
      avatar: faker.image.avatar(),
    },
  ]);
};
