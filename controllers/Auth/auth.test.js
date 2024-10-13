/* eslint-disable no-undef */
const request = require("supertest");
const express = require("express");
const { signUpController } = require("./auth"); // Correct import for the controller
const bodyParser = require("body-parser");

// Set up a simple Express app for testing
const app = express();
app.use(bodyParser.json());

// Define the route
app.post("/register", signUpController);

describe("POST /register", () => {
  const reqBody = {
    username: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "admin",
  };

  //   test("should return 201 if user is created successfully", async () => {
  //     const res = await request(app).post("/register").send(reqBody);

  //     expect(res.status).toBe(201);
  //     expect(res.body.message).toBe("User created successfully");
  //   });
  describe("user object when the request is not valid", () => {
    // should return 400 if username is missing
    test("should return 400 if username is missing ", async () => {
      const res = await request(app)
        .post("/register")
        .send({ ...reqBody, username: undefined });
      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        message: ["username is required"],
      });
    });
    test("should return 400 and email already exist when email already exits ", async () => {
      const res = await request(app).post("/register").send(reqBody);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email already exists");
    });
    // test("should return 400 and email already exist when email already exits ", async () => {
    //   const res = await request(app).post("/register").send(reqBody);
    //   expect(res.status).toBe(400);
    //   expect(res.body.message).toBe("Email already exists");
    // });
    // should return 400 if email is invalid
    // should return 400 if password is too short
    // should return 400 if email already exists
    // should return 500 if a server error occurs
  });
});
