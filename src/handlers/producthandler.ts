import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import dotenv from "dotenv";
//import jwt,{ Secret } from "jsonwebtoken";
import verifyToken from "../middlewares/verifyAuth";

dotenv.config();
//const SECRET = process.env.TOKEN_KEY as Secret;

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await store.show(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      res.json("unable to get product");
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const getProdByCate = async (req: Request, res: Response) => {
  try {
    const cate: string = req.params.cate;
    const product = await store.prodbycategory(cate);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      res.json("unable to get product by category");
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const getTopfiveProd = async (req: Request, res: Response) => {
  try {
    const top: number = parseInt(req.params.top);
    const product = await store.topProducts(top);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      res.json("unable to get top 5 products by");
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(product);

    if (newProduct) {
      res.json({ Message: "Product created Successfuly", Product: newProduct });
    } else {
      res.json("There was an error creating the Product");
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deleted = await store.delete(id);

    if (deleted) {
      res.json("Successfully deleted");
    } else {
      res.json("delete not successful please check the data");
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred:" + error,
    });
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.get("/products/top/:top", getTopfiveProd);
  app.get("/products/category/:cate", getProdByCate);
  app.post("/products", verifyToken, create);
  app.delete("/products/:id", verifyToken, destroy);
};

export default productRoutes;
