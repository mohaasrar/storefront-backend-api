// @ts-ignore
import dbConn from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

export type User = {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async create(user: User): Promise<User> {
    const { username, firstName, lastName, password } = user;
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const hashedPassword = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string, 10)
      );
      const sql =
        "INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [
        username,
        firstName,
        lastName,
        hashedPassword,
      ]);

      const user = result.rows[0];
      conn.release();
      return user;
    } catch (e) {
      console.log(e);
      throw new Error("Error occurred while creating user:" + e);
    }
  }

  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      console.log(e);
    }
    throw new Error("error fetching users");
  }

  async show(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const sql = "SELECT * FROM users WHERE id=($1);";
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (e) {
      throw new Error("Could not fetch the user information");
    }
  }

  async authenticate(username: string, password: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await dbConn.connect();
      const sql = "SELECT * FROM users WHERE username=($1) ";
      const user = await conn.query(sql, [username]);

      console.log(user.rows.length);
      if (user.rows.length > 0) {
        if (
          bcrypt.compareSync(password + BCRYPT_PASSWORD!, user.rows[0].password)
        ) {
          conn.release();
          return user.rows[0];
        }
      }
      conn.release();
      throw new Error("unable to autenticate please try again");
    } catch (e) {
      console.log(e);
      throw new Error("Error while authenticating");
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *;";
      // @ts-ignore
      const conn = await dbConn.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];

      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`);
    }
  }
}
