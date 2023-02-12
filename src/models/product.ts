// @ts-ignore
import dbConn from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async prodbycategory(cate: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const sql = "SELECT *  FROM products where category=($1)";
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [cate]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async topProducts(top: number): Promise<Product[]> {
    try {
      // @ts-ignore
      const sql = `SELECT order_products.id, name, quantity  
                          FROM order_products INNER JOIN products
       on order_products.product_id = products.id  order by quantity DESC LIMIT ($1)`;
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [top]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, category, price) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [p.name, p.category, p.price]);
      const Product = result.rows[0];
      conn.release();
      return Product;
    } catch (err) {
      throw new Error(`Could not add new Product. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [id]);
      const Product = result.rows[0];
      conn.release();
      return Product;
    } catch (err) {
      throw new Error(`Could not delete Product ${id}. Error: ${err}`);
    }
  }
}
