import { NextFunction, Request, Response } from "express";
import jwt, { Secret }from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



const SECRET = process.env.TOKEN_SECRET as Secret;


const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;
  const token: string|undefined  = authorization?.split(" ")[1];
  try {
    
    const decoded = jwt.verify(token!, SECRET);
    next();
  } catch (e) {
    res.status(401).json({
      message: "access denied unathorized attempt",
    });
  }
};

export default verifyToken;