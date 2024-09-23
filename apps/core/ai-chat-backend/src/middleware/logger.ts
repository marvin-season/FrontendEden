import {Request, Response, NextFunction} from "express";


const logger = (req: Request, res: Response, next: NextFunction) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
};

export default logger
