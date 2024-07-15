// src/index.js
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import IndexController from './controller';

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.use('/api', IndexController)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
