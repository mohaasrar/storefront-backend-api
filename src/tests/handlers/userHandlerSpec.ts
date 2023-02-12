import supertest from "supertest";
import app from "../../server";
import { UserStore } from "../../models/user";

const request = supertest(app);

const store = new UserStore();

const user = {
  username: "user1",
  firstName: "kebe",
  lastName: "abe",
  password: "pass123",
};

let token: string;

describe("User Routes", () => {
  describe("/POST", () => {
    it("should create a new user and return a token", async () => {
      const res = await request.post("/users").send({
        username: "Test1",
        firstname: "abe",
        lastname: "kebe",
        password: "pass123",
      });
      //token = response.body;
      expect(res.status).toBe(200);
    });

    it("should allow user to login and return a token", async () => {
      const response = await request.post("/login").send({
        username: "Test1",
        password: "pass123",
      });
      token = response.body;
      expect(token).toBeDefined();
    });
  });
  describe("/GET", () => {
    it("should require a token to view all users", async () => {
      return await request.get("/users").expect(401);
    });

    it("should return a list of users when a token is set", async () => {
      const response = await request
        .get("/users")
        .set("Authorization", "Bearer " + token)
        .expect(200);
      expect(response.status).toEqual(200);
    });

    it("should get a single user", async () => {
      const response = await request
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .query({ id: 1 })
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });
  describe("/POST", () => {
    it("should delete a given user", async () => {
      const res = await request
        .delete("/users/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });
});
