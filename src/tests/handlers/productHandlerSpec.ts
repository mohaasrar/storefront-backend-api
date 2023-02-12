import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

let token: String;
let id: number;

describe("Product Routes", () => {
  describe("/POST", () => {
    beforeAll(async () => {
      const response = await request.post("/users").send({
        username: "user5",
        firstname: "abe",
        lastname: "kebe",
        password: "pass123",
      });
      token = response.body;

      expect(token).toBeDefined();
    });
    it("should create a new Product", async () => {
      const res = await request
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Chair",
          price: 5000,
          category: "Home",
        });
      // token = res.body.token;
      expect(res.body).toBeDefined();
      expect(res.status).toEqual(200);
    });
    it("should delete a single Product", async () => {
      const id = 1;
      const res = await request
        .delete(`/products/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(res.status).toEqual(200);
    });
  });

  describe("/GET", () => {
    it("should return a list of products", async () => {
      const res = await request.get("/products").expect(200);
      expect(res.status).toEqual(200);
    });

    it("should return a list of products by category", async () => {
      const res = await request.get("/products/category/Home").expect(200);
      expect(res.status).toEqual(200);
    });

    it("should return a top 5  products", async () => {
      const res = await request.get("/products/top/5").expect(200);
      expect(res.status).toEqual(200);
    });

    it("should get a single product", async () => {
      const res = await request.get("/products").query({ id: "1" });
      // .expect(200);
      expect(res.status).toEqual(200);
    });
  });
});
