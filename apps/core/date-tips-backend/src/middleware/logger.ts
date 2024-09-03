import {Request, Response, NextFunction} from "express";


const logger = (req: Request, res: Response, next: NextFunction) => {
  const time = new Date();
  console.log("===============================start=============================");
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  console.log(`[${time.toLocaleString()}] body: ${JSON.stringify(req.body)}`);
  console.log(`[${time.toLocaleString()}] params:  ${JSON.stringify(req.params)}`);
  console.log(`[${time.toLocaleString()}] query:  ${JSON.stringify(req.query)}`);
  console.log("===============================end=============================");
  next();
};

export default logger
