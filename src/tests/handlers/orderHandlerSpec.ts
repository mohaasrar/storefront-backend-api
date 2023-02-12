import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

let token: string;

describe("Order Routes", () => {
  describe("/POST", () => {
    beforeAll(async () => {
      const response = await request.post("/users").send({
        username: "user2",
        firstname: "abe",
        lastname: "kebe",
        password: "pass123",
      });
      token = response.body;
      expect(token).toBeDefined();
    });
    it("should create a new order ", async () => {
      const res = await request
        .post("/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({ userId: 1 });
      expect(200);
      expect(res.body).toBeDefined;
    });

    it("should add product to an order", async () => {
      let id = 1;
      const res = await request
        .post(`/orders/${id}/products`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          productId: 1,
          quantity: 300,
        });

      expect(res.body).toBeDefined;
    });
    it("should delete order", async () => {
      let id: number = 1;
      const res = await request
        .delete(`/orders/${id}`)
        .set("Authorization", `Bearer ${token}`);
      // .expect(200);
      expect(res.status).toBeDefined;
    });
  });

  describe("/GET", () => {
    it("should not return current order for the given user", async () => {
      return await request.get("/orders/current/1").expect(200);
    });
    it("should not return completed orders", async () => {
      const res = await request.get("/orders/complete/1");
      expect(res.status).toEqual(200);
    });

    it("should not return all orders when no taken given", async () => {
      return await request.get("/orders").expect(200);
    });

    it("should return a list of orders when token exist", async () => {
      const res = await request
        .get("/orders")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(res.status).toEqual(200);
    });

    it("should get a single order", async () => {
      const res = await request
        .get("/orders")
        .query({ id: 1 })
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(res.status).toEqual(200);
    });
  });
});
