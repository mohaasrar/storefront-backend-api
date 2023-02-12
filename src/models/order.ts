import dbConn from "../database";

export type Order = {
  id?: number;
  userId: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find the order. Error: ${err}`);
    }
  }
  async create(userId: number): Promise<Order> {
    try {
      const conn = await dbConn.connect();
      const sql =
        "SELECT id FROM orders WHERE user_id = ($1) AND status = 'active';";
      const result = await conn.query(sql, [userId]);
      if (result.rows[0]) {
        conn.release();
        throw new Error("active order already exists");
      } else {
        try {
          const sql =
            "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;";
          const result = await conn.query(sql, [userId, "active"]);
          const order = result.rows[0];
          conn.release();
          return order;
        } catch (err) {
          throw new Error(`Error while creating order: Error ${err}`);
        }
      }
    } catch (err) {
      throw new Error(`unable to create order: Error ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1);";
      // @ts-ignore
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`Could not find Order. Error: ${err}`);
    }
  }

  async addProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<Order | string> {
    try {
      if (orderId === undefined) {
        return "order Id not defined";
      }
      const sql =
        "INSERT INTO order_products (order_id, product_id,quantity ) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [orderId, productId, quantity]);

      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add product to order: ${err}`);
    }
  }

  async currentordersbyUser(userId: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = ($1) AND status = 'active'";
      const result = await conn.query(sql, [userId]);
      const order = result.rows;

      conn.release();
      return order;
    } catch (err) {
      console.log(err);
      throw new Error(`unable to get active order with a given user: ${err}`);
    }
  }

  async completeordersbyUser(userId: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = ($1) AND status = 'complete'";
      const result = await conn.query(sql, [userId]);
      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`unable to get complete order with a given user: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [id]);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`);
    }
  }
}
