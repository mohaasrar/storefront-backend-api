import express, { Request, Response } from "express";
import verifyToken from "../middlewares/verifyAuth";
import { OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const completordersbyuser = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.userid);
    const order = await store.completeordersbyUser(userid);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentordersbyuser = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.userid);
    const order = await store.currentordersbyUser(userid);
    res.json(order);
  } catch (err) {
    res.status(400).json({
      message: "An error occurred:" + err,
    });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const order = await store.show(id);
    res.json(order);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const newOrder = await store.create(userId);
    if (newOrder) {
      res.json({ Message: "Order created Successfuly", Order: newOrder });
      //res.status(200)
    } else {
      res.json("There was an error creating the order");
    }
  } catch (err) {
    res.status(400).json({
      message: "An error occurred:" + err,
    });
  }
};

const addProduct = async (_req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(_req.params.id);
    const productId: number = parseInt(_req.body.productId);
    const quantity: number = parseInt(_req.body.quantity);
    const addedProduct = await store.addProduct(orderId, productId, quantity);
    res.json(addedProduct);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await store.delete(id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyToken, index);
  app.get("/orders/complete/:userid", verifyToken, completordersbyuser);
  app.get("/orders/current/:userid", verifyToken, currentordersbyuser);
  app.get("/orders/:id", verifyToken, show);
  app.post("/orders/:id/products", verifyToken, addProduct);
  app.post("/orders", verifyToken, create);
  app.delete("/orders/:id", verifyToken, destroy);
};

export default orderRoutes;
