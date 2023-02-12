import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import verifyToken from "../middlewares/verifyAuth";

dotenv.config();

const SECRET = process.env.TOKEN_SECRET as Secret;
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, SECRET);
    res.json(token);
  } catch (err) {
    res.status(400).json({
      message: "An error occurred:" + err,
    });
  }
};

const auth = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const u = await store.authenticate(username, password);
    let token = jwt.sign({ user: u }, SECRET);
    res.json(token);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await store.delete(id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyToken, index);
  app.get("/users/:id", verifyToken, show);
  app.post("/login", auth);
  app.post("/users", create);
  app.delete("/users/:id", verifyToken, destroy);
};

export default userRoutes;
