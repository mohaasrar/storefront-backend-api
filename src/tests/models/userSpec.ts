import { User, UserStore } from "../../models/user";

const store = new UserStore();

const user = {
  username: "user1",
  firstName: "kebe",
  lastName: "abe",
  password: "pass123",
};

describe("User Model Test", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a User", async () => {
    const result = await store.create(user);
    expect(result).toBeDefined();
  });

  it("index method should return a list of user", async () => {
    const result = await store.index();
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
  });

  it("show method should return the correct User", async () => {
    const result = await store.show(2);
    expect(result).toBeDefined();
    expect(result?.id).toEqual(2);
  });

  it("delete method should remove the User", async () => {
    //const {id} = await store.create(user);
    const result = await store.delete(2);
    expect(result).toBeDefined();
  });
});
